# Docker containers

This project ships two Docker containers managed via Docker Compose.

---

## Dev container (`dev`)

A Node.js development server for working on the blog's layout, components, and configuration.

### Requirements

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

### Start the server

```sh
docker compose up dev
```

The Nuxt dev server becomes available at <http://localhost:3000> with hot-module replacement. The entire project root is mounted inside the container, so any file you save is reflected immediately.

### Stop the server

```sh
# Ctrl+C in the terminal running compose up, or from another terminal:
docker compose stop dev
```

### Rebuild the container

Only needed after changing `package.json`:

```sh
docker compose up dev --build
```

---

## Vim container (`vim`)

A self-contained, distraction-free vim environment for writing and editing the blog's Markdown content. It uses plain **vim** (not neovim) and is intentionally minimal — no LSP, no linters, no code-completion.

### Requirements

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

### Build the image

The first run builds the image automatically. To build it explicitly:

```sh
docker compose build vim
```

### Open a specific post

```sh
docker compose run --rm vim 2024/my-post.md
```

### Open the content directory

```sh
docker compose run --rm vim .
```

`./content` is mounted as `/content` inside the container, so you can navigate to any post from inside vim with `:e`.

### Installed plugins

| Plugin | Purpose |
|---|---|
| `preservim/vim-markdown` | Markdown syntax, folding, YAML front-matter highlighting |
| `junegunn/goyo.vim` | Distraction-free writing mode (80-column centred layout) |
| `junegunn/limelight.vim` | Dims all paragraphs except the one being edited |
| `itchyny/lightline.vim` | Lean status bar |

### Key bindings

| Key | Action |
|---|---|
| `Space` | Leader key |
| `<leader>g` | Toggle Goyo (distraction-free mode) |
| `<leader>s` | Toggle spell check |
| `<leader>w` | Save file |
| `<leader>q` | Quit |
| `<leader><Space>` | Clear search highlight |
| `j` / `k` | Move by visual (wrapped) lines |

### Spell check

Spell check is enabled automatically for every `.md` file in both **English** and **Portuguese**. Misspelled words are underlined. Navigate between errors with `]s` / `[s` and suggest corrections with `z=`.
