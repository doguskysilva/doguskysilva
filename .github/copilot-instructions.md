# Copilot instructions for `doguskysilva`

## Build, test, and lint commands

This repository uses **Node 22** in GitHub Actions. Prefer `npm ci` over `npm install` when you need a clean dependency install.

```bash
npm ci
npm run dev
npm run lint
npm run test
npm run test -- tests/PostDate.spec.ts
npm run test -- -t "renders a <time> element"
npm run build
npm run generate
npm run preview
```

## High-level architecture

- This is a **Nuxt 4** site built around local layouts/components plus Nuxt Content. The repository owns the blog UI, site configuration, content collections, and server routes directly.
- **Content drives the site.** `content.config.ts` defines three Nuxt Content collections:
  - `posts`: default-language markdown pages from `content/**` excluding `content/en/**` and dot-prefixed draft files
  - `posts_en`: English pages from `content/en/**`
  - `authors`: YAML author records from `content/authors/*.yml`
- **Routing is normalized through `utils/postPath.ts`.** The catch-all page at `pages/[...slug].vue` converts public URLs such as `/pt/posts/...` and `/en/posts/...` into Nuxt Content paths, redirects legacy `/blog/...` URLs, and also redirects old year-based paths. Reuse `toPublicPath()` / `toContentPath()` instead of open-coding path transformations.
- **Rendering is local to this repository.** Layouts such as `layouts/default.vue`, `layouts/home.vue`, and `layouts/posts.vue` compose local components like `Header`, `Menu`, `Listing`, `Toc`, and `CommentSystem`. When changing blog UI behavior, start with the local `layouts/`, `components/`, and `pages/` files.
- **App-level metadata lives in `app.config.ts` and `nuxt.config.ts`.** `app.config.ts` holds site identity, menu, pagination, socials, and fallback authors. `nuxt.config.ts` wires modules (`@nuxt/content`, `@nuxtjs/i18n`, Tailwind, image, sitemap, schema.org, VueUse, Nuxt Studio), prerenders `/rss.xml` and `/api/__sitemap__/urls`, and exposes the public site URL through runtime config.
- **Server routes assemble derived content.**
  - `server/api/search.ts` builds locale-aware search data from Nuxt Content search sections and filters it down to post routes.
  - `server/api/__sitemap__/urls.ts` merges both locale collections into sitemap entries and normalizes alternate URLs.
  - `server/routes/rss.xml.ts` builds the RSS feed from both locale collections.
- **Deployment is Docker-based in current automation.** `.github/workflows/ci.yml` runs lint and tests on pull requests. `.github/workflows/deploy.yml` runs lint and tests on `main`, builds and pushes a Docker image to `ghcr.io/doguskysilva/doguskysilva`, then triggers Dokploy. The local `Dockerfile` builds the Nuxt app and runs the generated Node server from `.output`.

## Key conventions

- **Default-locale content lives outside `content/en/`; English content lives inside `content/en/`.** Keep translated pages mirrored by path when possible because routing, hreflang generation, sitemap generation, and search all assume the two locale collections line up.
- **Dot-prefixed markdown files are drafts.** `content.config.ts` excludes `**/.*.md`, and runtime queries also commonly filter `draft = false` and `listed = true`. Preserve those filters when adding content queries for public pages, feeds, search, or sitemap data.
- **Use frontmatter fields already modeled in `content.config.ts`.** Important fields include `id`, `title`, `description`, `date`, `categories`, `tags`, `listed`, `draft`, `author`, `cover`, `alternates`, `nocomments`, `redirect_to_domain`, and `redirect_to_full_url`.
- **Author resolution has two sources.** `findAuthor()` prefers `content/authors/*.yml` records when available and falls back to `app.config.ts` authors. Reuse that path instead of duplicating fallback logic in pages or components.
- **Locale handling is path-based, not implicit.** `app.vue`, `pages/[...slug].vue`, search filtering, canonical URLs, and hreflang tags all branch on whether the current route starts with `/en`. Be careful to preserve that convention when adding routes or links.
- **Search indexes only post URLs after normalization.** `server/api/search.ts` intentionally filters to `/pt/posts/<year>/...` and `/en/posts/<year>/...`; adding searchable content outside that shape requires updating the regex and path normalization together.
- **Tests are plain Vitest specs under `tests/` using `happy-dom`.** Existing tests import composables and Vue components directly; follow that style for repo-local behavior such as helpers, route/path utilities, and small UI overrides.
