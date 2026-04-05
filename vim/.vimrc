" ============================================================
"  Minimalist Vim – Markdown editing
" ============================================================

" --- Plugin management (vim-plug) ---
call plug#begin('~/.vim/plugged')

" Markdown syntax, folding and concealment
Plug 'preservim/vim-markdown'

" Distraction-free writing
Plug 'junegunn/goyo.vim'

" Focus highlight for the current paragraph
Plug 'junegunn/limelight.vim'

" Lightweight and informative status line
Plug 'itchyny/lightline.vim'

call plug#end()

" -------------------------------------------------------
"  General
" -------------------------------------------------------
set nocompatible
filetype plugin indent on
syntax enable

set encoding=utf-8
set fileencoding=utf-8

" No swap or backup files – content/ is already in git
set noswapfile
set nobackup
set nowritebackup

" -------------------------------------------------------
"  Look & feel
" -------------------------------------------------------
set background=dark
set t_Co=256

" Always show the status line (needed by lightline)
set laststatus=2
" Hide the default mode indicator (lightline shows it)
set noshowmode

" Line numbers – relative makes navigation easier
set number
set relativenumber

" Highlight the current line
set cursorline

" Keep some breathing room around the cursor
set scrolloff=5

" -------------------------------------------------------
"  Editing
" -------------------------------------------------------
set wrap
set linebreak           " Break at word boundaries, not mid-word
set textwidth=0         " Let Goyo control visible width
set wrapmargin=0

" Indentation
set tabstop=2
set softtabstop=2
set shiftwidth=2
set expandtab

" -------------------------------------------------------
"  Search
" -------------------------------------------------------
set hlsearch
set incsearch
set ignorecase
set smartcase

" -------------------------------------------------------
"  Spell check (English + Portuguese)
" -------------------------------------------------------
set spelllang=en,pt
" Toggle spell check with <leader>s
nnoremap <leader>s :setlocal spell!<CR>

" -------------------------------------------------------
"  Markdown settings
" -------------------------------------------------------
let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_conceal = 0
let g:vim_markdown_frontmatter = 1   " Highlight YAML front-matter
let g:vim_markdown_toml_frontmatter = 0
let g:vim_markdown_auto_insert_bullets = 1
let g:vim_markdown_new_list_item_indent = 2

" Enable spell check automatically for markdown files
autocmd FileType markdown setlocal spell

" -------------------------------------------------------
"  Goyo (distraction-free mode)
" -------------------------------------------------------
let g:goyo_width = 80
let g:goyo_height = '90%'

" Enter Goyo automatically when opening a markdown file
autocmd FileType markdown Goyo

" Activate / deactivate Limelight together with Goyo
function! s:goyo_enter()
  set noshowcmd
  set scrolloff=999
  Limelight
endfunction

function! s:goyo_leave()
  set showcmd
  set scrolloff=5
  Limelight!
endfunction

autocmd! User GoyoEnter nested call <SID>goyo_enter()
autocmd! User GoyoLeave nested call <SID>goyo_leave()

" Toggle Goyo with <leader>g
nnoremap <leader>g :Goyo<CR>

" -------------------------------------------------------
"  Limelight
" -------------------------------------------------------
" Dim inactive paragraphs to 40% brightness
let g:limelight_conceal_ctermfg = 240
let g:limelight_default_coefficient = 0.7

" -------------------------------------------------------
"  Lightline
" -------------------------------------------------------
let g:lightline = {
      \ 'colorscheme': 'wombat',
      \ 'active': {
      \   'left':  [['mode', 'paste'], ['filename', 'modified']],
      \   'right': [['lineinfo'], ['percent'], ['filetype']]
      \ },
      \ }

" -------------------------------------------------------
"  Key mappings
" -------------------------------------------------------
let mapleader = " "

" Navigate wrapped visual lines naturally
nnoremap j gj
nnoremap k gk

" Clear search highlight
nnoremap <leader><space> :nohlsearch<CR>

" Quick save
nnoremap <leader>w :w<CR>

" Quick quit (Goyo must be closed first to avoid empty buffer)
nnoremap <leader>q :q<CR>
