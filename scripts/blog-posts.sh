#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
CONTENT_DIR="${ROOT_DIR}/content"
DEFAULT_EDITOR="${EDITOR:-vi}"

usage() {
  cat <<'USAGE'
Manage blog posts without Bloggrify CLI.

Usage:
  blog-posts.sh new [options]
  blog-posts.sh list [options]
  blog-posts.sh edit <slug-or-path> [--lang pt|en]
  blog-posts.sh show <slug-or-path> [--lang pt|en|both]
  blog-posts.sh delete <slug-or-path> [--lang pt|en|both] [--yes]
  blog-posts.sh draft <slug-or-path> [--lang pt|en|both]
  blog-posts.sh publish <slug-or-path> [--lang pt|en|both]
  blog-posts.sh help

Commands:
  new      Create a new post markdown file with frontmatter
  list     List posts from content folders
  edit     Open a post in \$EDITOR (default: vi)
  show     Print matching post path(s)
  delete   Remove post file(s)
  draft    Convert published post(s) to draft (prefix filename with .)
  publish  Convert draft post(s) to published (remove leading .)

Options for `new`:
  --title "My Post"               (required)
  --description "Short summary"   (required)
  --date YYYY-MM-DD               (default: today)
  --slug my-post                  (default: slugified title)
  --year YYYY                     (default: year from --date)
  --lang pt|en|both               (default: pt)
  --categories "cat1,cat2"        (default: geral)
  --tags "tag1,tag2"              (default: sem-tag)
  --draft                         (prefix filename with .)

Options for `list`:
  --lang pt|en|both               (default: both)
  --year YYYY                     (optional)
  --drafts                        (only drafts)
  --published                     (only published)

Examples:
  ./scripts/blog-posts.sh new --title "Hello Bash" --description "CLI fallback"
  ./scripts/blog-posts.sh new --title "Translated" --description "..." --lang both --tags "nuxt,cli"
  ./scripts/blog-posts.sh list --lang en --year 2026
  ./scripts/blog-posts.sh draft hello-world --lang both
  ./scripts/blog-posts.sh publish .hello-world --lang pt
USAGE
}

die() {
  echo "Error: $*" >&2
  exit 1
}

require_content_dir() {
  [[ -d "${CONTENT_DIR}" ]] || die "content directory not found: ${CONTENT_DIR}"
}

trim() {
  local s="$1"
  s="${s#${s%%[![:space:]]*}}"
  s="${s%${s##*[![:space:]]}}"
  printf '%s' "$s"
}

slugify() {
  local text="$1"
  if command -v iconv >/dev/null 2>&1; then
    text="$(printf '%s' "$text" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null || printf '%s' "$text")"
  fi

  text="$(printf '%s' "$text" | tr '[:upper:]' '[:lower:]')"
  text="$(printf '%s' "$text" | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g')"

  [[ -n "$text" ]] || die "unable to generate slug from title"
  printf '%s' "$text"
}

uuid_gen() {
  if [[ -r /proc/sys/kernel/random/uuid ]]; then
    cat /proc/sys/kernel/random/uuid
    return
  fi
  if command -v uuidgen >/dev/null 2>&1; then
    uuidgen
    return
  fi
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 16 | sed -E 's/(.{8})(.{4})(.{4})(.{4})(.{12})/\1-\2-\3-\4-\5/'
    return
  fi
  date +%s%N
}

split_csv_to_yaml_list() {
  local input="$1"
  local item
  IFS=',' read -r -a arr <<< "$input"
  for item in "${arr[@]}"; do
    item="$(trim "$item")"
    [[ -n "$item" ]] && printf '  - %s\n' "$item"
  done
}

lang_to_base() {
  case "$1" in
    pt) printf '%s' "${CONTENT_DIR}" ;;
    en) printf '%s' "${CONTENT_DIR}/en" ;;
    *) die "invalid lang '$1' (expected pt or en)" ;;
  esac
}

resolve_matches() {
  local input="$1"
  local lang="$2"
  local -a bases=()
  local -a matches=()

  case "$lang" in
    pt) bases+=("$(lang_to_base pt)") ;;
    en) bases+=("$(lang_to_base en)") ;;
    both) bases+=("$(lang_to_base pt)" "$(lang_to_base en)") ;;
    *) die "invalid lang '$lang'" ;;
  esac

  if [[ "$input" = /* || "$input" == content/* ]]; then
    local candidate="$input"
    [[ "$candidate" = /* ]] || candidate="${ROOT_DIR}/${candidate}"
    [[ -f "$candidate" ]] && matches+=("$candidate")
  else
    local cleaned="$input"
    cleaned="${cleaned%.md}"
    cleaned="${cleaned#.}"
    local base year dir

    for base in "${bases[@]}"; do
      while IFS= read -r -d '' year; do
        dir="$base/$year"
        [[ -d "$dir" ]] || continue
        [[ -f "$dir/${cleaned}.md" ]] && matches+=("$dir/${cleaned}.md")
        [[ -f "$dir/.${cleaned}.md" ]] && matches+=("$dir/.${cleaned}.md")
      done < <(find "$base" -maxdepth 1 -mindepth 1 -type d -printf '%f\0' 2>/dev/null | sort -z)
    done
  fi

  if [[ ${#matches[@]} -eq 0 ]]; then
    return 1
  fi

  printf '%s\n' "${matches[@]}"
}

create_post_file() {
  local lang="$1"
  local title="$2"
  local description="$3"
  local date="$4"
  local year="$5"
  local slug="$6"
  local categories_csv="$7"
  local tags_csv="$8"
  local is_draft="$9"

  local base dir file_name path
  base="$(lang_to_base "$lang")"
  dir="${base}/${year}"
  file_name="${slug}.md"
  [[ "$is_draft" == "1" ]] && file_name=".${file_name}"
  path="${dir}/${file_name}"

  [[ -f "$path" ]] && die "file already exists: ${path}"

  mkdir -p "$dir"

  {
    echo "---"
    echo "id: $(uuid_gen)"
    echo "title: \"${title}\""
    echo "description: \"${description}\""
    echo "date: \"${date}\""
    echo "categories:"
    split_csv_to_yaml_list "$categories_csv"
    echo "tags:"
    split_csv_to_yaml_list "$tags_csv"
    echo "---"
    echo
    echo "## ${title}"
    echo
  } > "$path"

  echo "$path"
}

cmd_new() {
  local title=""
  local description=""
  local date="$(date +%F)"
  local slug=""
  local year=""
  local lang="pt"
  local categories="geral"
  local tags="sem-tag"
  local draft="0"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --title) title="${2:-}"; shift 2 ;;
      --description) description="${2:-}"; shift 2 ;;
      --date) date="${2:-}"; shift 2 ;;
      --slug) slug="${2:-}"; shift 2 ;;
      --year) year="${2:-}"; shift 2 ;;
      --lang) lang="${2:-}"; shift 2 ;;
      --categories) categories="${2:-}"; shift 2 ;;
      --tags) tags="${2:-}"; shift 2 ;;
      --draft) draft="1"; shift ;;
      -h|--help) usage; exit 0 ;;
      *) die "unknown option for new: $1" ;;
    esac
  done

  require_content_dir
  [[ -n "$title" ]] || die "--title is required"
  [[ -n "$description" ]] || die "--description is required"

  if ! [[ "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    die "--date must be YYYY-MM-DD"
  fi

  [[ -n "$slug" ]] || slug="$(slugify "$title")"
  [[ -n "$year" ]] || year="${date%%-*}"

  if ! [[ "$year" =~ ^[0-9]{4}$ ]]; then
    die "--year must be YYYY"
  fi

  case "$lang" in
    pt|en)
      create_post_file "$lang" "$title" "$description" "$date" "$year" "$slug" "$categories" "$tags" "$draft"
      ;;
    both)
      create_post_file "pt" "$title" "$description" "$date" "$year" "$slug" "$categories" "$tags" "$draft"
      create_post_file "en" "$title" "$description" "$date" "$year" "$slug" "$categories" "$tags" "$draft"
      ;;
    *) die "--lang must be pt, en, or both" ;;
  esac
}

cmd_list() {
  local lang="both"
  local year=""
  local only_drafts="0"
  local only_published="0"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --lang) lang="${2:-}"; shift 2 ;;
      --year) year="${2:-}"; shift 2 ;;
      --drafts) only_drafts="1"; shift ;;
      --published) only_published="1"; shift ;;
      -h|--help) usage; exit 0 ;;
      *) die "unknown option for list: $1" ;;
    esac
  done

  [[ "$only_drafts" == "1" && "$only_published" == "1" ]] && die "choose only one of --drafts or --published"

  local -a roots=()
  case "$lang" in
    pt) roots+=("$(lang_to_base pt)") ;;
    en) roots+=("$(lang_to_base en)") ;;
    both) roots+=("$(lang_to_base pt)" "$(lang_to_base en)") ;;
    *) die "--lang must be pt, en, or both" ;;
  esac

  local root
  for root in "${roots[@]}"; do
    [[ -d "$root" ]] || continue

    local target="$root"
    local -a find_args=()
    if [[ -n "$year" ]]; then
      target="$root/$year"
      [[ -d "$target" ]] || continue
      find_args=("$target" -maxdepth 1 -type f)
    else
      # Only list blog posts in YEAR/slug.md (exclude static pages like about.md).
      find_args=("$root" -mindepth 2 -maxdepth 2 -type f -path "$root/[0-9][0-9][0-9][0-9]/*.md")
    fi

    if [[ "$only_drafts" == "1" ]]; then
      find "${find_args[@]}" -name '.*.md' | sort
    elif [[ "$only_published" == "1" ]]; then
      find "${find_args[@]}" -name '*.md' ! -name '.*.md' | sort
    else
      find "${find_args[@]}" -name '*.md' | sort
    fi
  done
}

cmd_show() {
  [[ $# -ge 1 ]] || die "show requires <slug-or-path>"
  local slug_or_path="$1"
  shift

  local lang="both"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --lang) lang="${2:-}"; shift 2 ;;
      *) die "unknown option for show: $1" ;;
    esac
  done

  resolve_matches "$slug_or_path" "$lang" || die "no post found for '${slug_or_path}'"
}

cmd_edit() {
  [[ $# -ge 1 ]] || die "edit requires <slug-or-path>"
  local slug_or_path="$1"
  shift

  local lang="both"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --lang) lang="${2:-}"; shift 2 ;;
      *) die "unknown option for edit: $1" ;;
    esac
  done

  mapfile -t matches < <(resolve_matches "$slug_or_path" "$lang" || true)
  [[ ${#matches[@]} -gt 0 ]] || die "no post found for '${slug_or_path}'"
  [[ ${#matches[@]} -eq 1 ]] || die "multiple matches found, pass an exact path or use --lang: ${matches[*]}"

  "$DEFAULT_EDITOR" "${matches[0]}"
}

rename_mode() {
  local mode="$1"
  local slug_or_path="$2"
  local lang="$3"

  mapfile -t matches < <(resolve_matches "$slug_or_path" "$lang" || true)
  [[ ${#matches[@]} -gt 0 ]] || die "no post found for '${slug_or_path}'"

  local file dir base target
  for file in "${matches[@]}"; do
    dir="$(dirname "$file")"
    base="$(basename "$file")"

    if [[ "$mode" == "draft" ]]; then
      if [[ "$base" == .* ]]; then
        echo "already draft: $file"
        continue
      fi
      target="${dir}/.${base}"
    else
      if [[ "$base" != .* ]]; then
        echo "already published: $file"
        continue
      fi
      target="${dir}/${base#.}"
    fi

    [[ -e "$target" ]] && die "target exists: $target"
    mv "$file" "$target"
    echo "$target"
  done
}

cmd_delete() {
  [[ $# -ge 1 ]] || die "delete requires <slug-or-path>"
  local slug_or_path="$1"
  shift

  local lang="both"
  local yes="0"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --lang) lang="${2:-}"; shift 2 ;;
      --yes) yes="1"; shift ;;
      *) die "unknown option for delete: $1" ;;
    esac
  done

  mapfile -t matches < <(resolve_matches "$slug_or_path" "$lang" || true)
  [[ ${#matches[@]} -gt 0 ]] || die "no post found for '${slug_or_path}'"

  if [[ "$yes" != "1" ]]; then
    printf 'This will delete %d file(s). Continue? [y/N] ' "${#matches[@]}"
    read -r ans
    [[ "$ans" =~ ^[Yy]$ ]] || die "aborted"
  fi

  local file
  for file in "${matches[@]}"; do
    rm -f "$file"
    echo "deleted: $file"
  done
}

cmd_draft() {
  [[ $# -ge 1 ]] || die "draft requires <slug-or-path>"
  local slug_or_path="$1"
  shift
  local lang="both"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --lang) lang="${2:-}"; shift 2 ;;
      *) die "unknown option for draft: $1" ;;
    esac
  done

  rename_mode draft "$slug_or_path" "$lang"
}

cmd_publish() {
  [[ $# -ge 1 ]] || die "publish requires <slug-or-path>"
  local slug_or_path="$1"
  shift
  local lang="both"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --lang) lang="${2:-}"; shift 2 ;;
      *) die "unknown option for publish: $1" ;;
    esac
  done

  rename_mode publish "$slug_or_path" "$lang"
}

main() {
  local cmd="${1:-help}"
  shift || true

  case "$cmd" in
    new) cmd_new "$@" ;;
    list) cmd_list "$@" ;;
    edit) cmd_edit "$@" ;;
    show) cmd_show "$@" ;;
    delete) cmd_delete "$@" ;;
    draft) cmd_draft "$@" ;;
    publish) cmd_publish "$@" ;;
    help|-h|--help) usage ;;
    *) die "unknown command: ${cmd}" ;;
  esac
}

main "$@"
