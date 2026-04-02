# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run generate   # Generate static site (SSG)
npm run preview    # Preview production build
npm run lint       # ESLint (requires .nuxt/ — run npm install first)
npm run test       # Vitest unit tests
```

## Architecture

This is a **Nuxt 4** personal blog (Douglas Silva / doguskysilva) deployed statically to Netlify. It uses [Bloggrify](https://bloggrify.com/) as a layer — a Nuxt-based blog framework that provides layouts, components, and content handling via `@bloggrify/core`.

**Key design decisions:**
- The project `extends: ['@bloggrify/core']` in `nuxt.config.ts`, meaning most of the UI/layout logic lives inside that npm package, not in this repo.
- Content is authored as Markdown files under `content/`. Blog posts go in `content/YYYY/slug.md`; files prefixed with `.` are drafts (not published).
- English translations live in `content/_en/` — same structure mirrored for i18n via `@nuxtjs/i18n`.
- Site metadata, theme, navigation menu, and author info are configured in `app.config.ts`.
- Deployment is fully automatic: push to GitHub → Netlify builds and publishes.

**Content frontmatter fields** (blog posts):
- `id`, `title`, `description`, `date`, `categories`, `tags` — standard post metadata
- `layout: home` and `listed: false` — used on special pages like `content/index.md`

To add a new post: create `content/YYYY/slug.md` with appropriate frontmatter. Prefix with `.` to keep it as a draft.

## Docker / Deployment

The `Dockerfile` does a two-stage build: `node:22-alpine` runs `nuxi generate` to produce the static site in `.output/public`, then `nginx:alpine` serves it on port 80.

The image is published to **ghcr.io** (`ghcr.io/doguskysilva/doguskysilva`) by the deploy workflow on every merge to `main`, tagged with `latest` and the commit SHA.

On **Dokploy**: point to the ghcr.io image and set the container port to `80`.

## CI / GitHub Actions

- **`.github/workflows/ci.yml`** — runs on every pull request: `lint` and `test` jobs in parallel.
- **`.github/workflows/deploy.yml`** — runs on push to `main`: same lint + test jobs, then `docker` job (needs both to pass) builds and pushes to ghcr.io using the built-in `GITHUB_TOKEN`.

## Custom components

- **`components/PostDate.vue`** — renders a `<time>` element from a `date` string prop (`YYYY-MM-DD`). Accepts an optional `locale` prop (default `pt-BR`). Unit tests are in `tests/PostDate.spec.ts`.
