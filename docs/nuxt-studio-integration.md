# Nuxt Studio Integration

Web UI for creating and editing blog posts directly in the browser, backed by GitHub.

## Overview

Nuxt Studio requires SSR (`nuxi build` + Node server) instead of the current SSG setup. The trade-off is a slightly heavier deployment (Node process instead of nginx) in exchange for a full content editing UI at `/_studio`.

Auth: GitHub OAuth (sole editor).

---

## Step 1 — Install nuxt-studio module

```bash
npx nuxi module add nuxt-studio
```

Automatically adds `nuxt-studio` to `package.json` and registers it in `nuxt.config.ts`.

---

## Step 2 — Configure `nuxt.config.ts`

Add the `studio` block:

```ts
studio: {
  repository: {
    provider: 'github',
    owner: 'doguskysilva',
    repo: 'doguskysilva',
    branch: 'main',
  },
},
```

No `ssr: true` needed — it is the default when using `nuxi build`.

---

## Step 3 — Create GitHub OAuth App

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
2. Fill in:
   - Homepage URL: `https://dogusky.cloud`
   - Callback URL: `https://dogusky.cloud/__nuxt_studio/auth/github`
3. Copy **Client ID** and **Client Secret**

---

## Step 4 — Add environment variables to Dokploy

In Dokploy project → Environment panel, add:

```
STUDIO_GITHUB_CLIENT_ID=<from step 3>
STUDIO_GITHUB_CLIENT_SECRET=<from step 3>
```

These are runtime variables — not committed to the repo.

---

## Step 5 — Rewrite Dockerfile (SSG → SSR)

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=builder /app/.output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
```

Key changes from current Dockerfile:
- `npm run generate` → `npm run build`
- `nginx:alpine` → `node:22-alpine`
- Port `80` → `3000`
- Serves `.output/server/index.mjs` instead of static files

---

## Step 6 — Add `start` script to `package.json`

```json
"start": "node .output/server/index.mjs"
```

Useful for testing the production SSR build locally before deploying.

---

## Step 7 — Update Dokploy container port

In Dokploy → project settings → change container port **80 → 3000**.

---

## Files Modified

| File | Change |
|---|---|
| `package.json` | `nuxt-studio` added by module installer; `start` script added |
| `nuxt.config.ts` | `nuxt-studio` registered + `studio` config block |
| `Dockerfile` | Switch from nginx static to Node SSR; port 80 → 3000 |

Manual steps (outside repo):
- GitHub OAuth App creation
- Dokploy env vars + port update

---

## Verification

1. `npm run build` — confirm `.output/server/index.mjs` is generated
2. `node .output/server/index.mjs` — visit `http://localhost:3000/_studio` → GitHub login appears
3. Authenticate → confirm you can browse and edit `content/` files in the Studio UI
4. Push to `main` → CI builds image → Dokploy webhook auto-deploys
5. Visit `https://dogusky.cloud/_studio` → Studio loads over HTTPS
6. Create a test post via Studio → confirm it commits to the GitHub repo
