---
id: 2f9f9961-2af4-4cad-9c09-4b8ffbc49ac3
title: "Omarchy: primeiros passos"
description: "Minha experiência migrando para o Omarchy, configurando meu setup de desenvolvimento e ajustando ferramentas como ZSH, Neovim e Tmux."
date: "2025-10-13"
categories:
  - linux
  - desenvolvimento
  - pessoal
tags:
  - omarchy
  - archlinux
  - zsh
  - tmux
  - neovim
alternates:
  - hreflang: "pt"
    href: "/2025/omarcy-first-steps"
  - hreflang: "en"
    href: "/en/2025/omarcy-first-steps"
---



Recentemente, iniciei a montagem de um novo setup, pois ante eu usava um MacBook Air M1, e agora uso também um desktop. Desde 2017, não uso Windows no dia a dia, sempre trabalhando com alguma distro Linux — inicialmente Ubuntu e depois Fedora. Em 2024, para conhecer uma nova distro, comecei a testar o Arch, instalando apenas o que realmente precisava para meu fluxo de trabalho diário.

Tive acesso ao projeto do DHH, o Omakub, baseado no Ubuntu, mas logo depois surgiu uma versão voltada para Arch: o [Omarchy](https://omarchy.org/).

## Por que Omarchy?

Sempre configurei meus computadores para estudo e desenvolvimento de software, mantendo apenas o que realmente uso.  
Sou um “cara do terminal” — grande parte do meu dia a dia passa por ferramentas CLI como Tmux, Neovim, Git, Docker e outras ligadas às linguagens que estudo ou uso. Para quase tudo, criei atalhos que aceleram meu fluxo.

Mesmo no MacOS, meu setup básico incluía terminal, Neovim + LazyVim, Tmux com plugins, ZSH + Oh-my-zsh, Docker ou Podman, Git com aliases e recentemente o Starship.  

O Omarchy entra aqui: ele vem com essas ferramentas instaladas e pré-configuradas (menos o ZSH, que vem com Bash). Unir Arch, meu setup habitual e meus atalhos parecia a escolha ideal.

## Instalação

O Omarchy pode ser instalado de duas formas: [manualmente](https://learn.omacom.io/2/the-omarchy-manual/96/manual-installation), instalando o Arch e depois os scripts do Omarchy, ou usando a ISO direta.  
Optei pela ISO, que já traz uma configuração padrão com BTRFS, Limine como bootloader e Snapper para snapshots e rollback. Como o desktop é pessoal, configurei proteção no boot e logon direto no meu usuário.


## Ajustes pós-instalação

Embora o Omarchy venha com quase tudo que costumo usar, precisei fazer algumas personalizações.  


### ZSH

O Omarchy vem com Bash, então instalei o ZSH e plugins principais:

```bash
yay -S zsh zsh-autosuggestions zsh-syntax-highlighting
```
E como eu uso a combinacão zsh + [oh-my-zsh](https://ohmyz.sh/) também fiz a seguinte instalacão:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

O Omarchy possui diversos arquivos de configuracão proprio para o bash e todos eles podem ser vistos na pasta `~/.local/share/omarchy/default/bash/`.

Um exemplo de arquivo que precisa ser atualizado é o `init` que possui a seguinte configuracão:

```config
if command -v mise &> /dev/null; then
  eval "$(mise activate bash)"
fi

if command -v starship &> /dev/null; then
  eval "$(starship init bash)"
fi
...
```

Então alterei o meu `.zshrc` para ficar com os seguintes imports e manter alguns imports default do bash do Omarchy.

```config
# ... previous zshrc setup

source ~/.config/zsh/shell
source ~/.config/zsh/aliases
source ~/.config/zsh/functions
source ~/.config/zsh/init
source ~/.config/zsh/envs
source ~/.config/zsh/inputrc
[[ -r ~/.config/zsh/secrets ]] && source ~/.config/zsh/secrets

# source from Omarchy
source ~/.local/share/omarchy/default/bash/aliases
source ~/.local/share/omarchy/default/bash/functions
source ~/.local/share/omarchy/default/bash/envs
```

Os arquivos `shell`, `aliases`, `functions`, `secrets` e `envs` são opcionais, enquanto `init` e `inputrc` são obrigatórios para manter o `mise`, `zoxide` e `starship` funcionando:

```config
# init

if command -v mise &> /dev/null; then
  eval "$(mise activate zsh)"
fi

if command -v starship &> /dev/null; then
  eval "$(starship init zsh)"
fi

if command -v zoxide &> /dev/null; then
  eval "$(zoxide init zsh)"
fi

if command -v fzf &> /dev/null; then
  if [[ -f /usr/share/fzf/completion.zsh ]]; then
    source /usr/share/fzf/completion.zsh
  fi
  if [[ -f /usr/share/fzf/key-bindings.zsh ]]; then
    source /usr/share/fzf/key-bindings.zsh
  fi
fi

if [ -d /usr/share/zsh/plugins/zsh-autosuggestions ]; then
  # plugins (from system packages)
  source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
fi

if [ -d /usr/share/zsh/plugins/zsh-syntax-highlighting ]; then
  # starship must init before syntax-highlighting
  source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
fi
```

O arquivo `inputrc` foi todo copiado e apenas as teclas de atalhos foram alteradas:

```config

# incremental history search with arrow keys
bindkey "^[[A" history-beginning-search-backward
bindkey "^[[B" history-beginning-search-forward

# Left/Right move cursor
bindkey '\e[C' forward-char
bindkey '\e[D' backward-char
```

### Tmux

