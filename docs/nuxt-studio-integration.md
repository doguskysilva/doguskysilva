# Nuxt Studio Integration (GitHub Auth)

This project is configured to use Nuxt Studio with GitHub authentication.

## What is configured in this repository

- `nuxt-studio` module is installed and enabled in `nuxt.config.ts`.
- `studio.repository` is configured for GitHub:
  - provider: `github`
  - owner/repo/branch from env vars (with defaults for this repo)
- Production Docker image runs SSR (`nuxi build` + `node server/index.mjs`) so Studio auth routes work.
- `start` script is available in `package.json`:
  - `npm run start`

## Required environment variables

Set these in your deployment platform (and optionally in local `.env`):

```bash
BASE_URL=https://your-domain.com
STUDIO_GITHUB_CLIENT_ID=
STUDIO_GITHUB_CLIENT_SECRET=
```

## GitHub OAuth app setup

Create an OAuth app in GitHub Developer Settings with:

- Homepage URL: `https://your-domain.com`
- Authorization callback URL: `https://your-domain.com/__nuxt_studio/auth/github`

For local testing, also allow:

- `http://localhost:3000/__nuxt_studio/auth/github`

## Verify

1. Build: `npm run build`
2. Start: `npm run start`
3. Open: `http://localhost:3000/_studio`
4. Login with GitHub and confirm you can edit and publish content.
