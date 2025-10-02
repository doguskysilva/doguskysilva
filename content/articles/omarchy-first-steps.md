---
cover: /articles/deploying.png
date: 2025-09-29
author:
  name: Douglas Silva
  avatarUrl: https://pbs.twimg.com/profile_images/1370286658432724996/ZMSDzzIi_400x400.jpg
  link: https://twitter.com/doguskysilva
layout: article
---

Recentemente eu iniciei a troca do meu setup que utilizava o MacBook Air M1 para o uso de um desktop. Desde 2017 eu não uso Windows no meu dia-a-dia, sempre utilizei alguma distro linux, que inicialmente era o Ubuntu e dois se tornou o Fedora. Em 2024 para aprender alguma distro nova eu  comecei a testar o Arch, pois assim instalaria absolutamente tudo que eu de fato precisava para o meu dia-a-dia.

Recentemente eu tive acesso ao projeto do DHH o Omakub que era baseado no Ubuntu. Mas logo depois saiu um versão voltada para o Arch o [Omarchy](https://omarchy.org/).

## Por quê Omarchy?
Eu sempre usei meu computador/notebook voltado para estudar e desenvolvimento de software. E nunca fui de instalar e manter instado coisas que não uso, sempre mantenho o que de fato preciso.

Outro ponto é que eu sempre fui um "cara do terminal". Sempre fiz muito uso do cli e ferramentas que rodam dentro do terminal no dia-a-dia, então coisas como tmux, Neovim, git, docker e as ferramentas das linguagens que estudo ou uso sempre fiz via CLI. Outro ponto é que para absolutamente quase tudo eu criei um atalho.

Dito isso eu sempre tive uma configuracão, mesmo quando usava o MacOS:
- Algum terminal (Iterm2, Gnome Terminal)
- Neovim + Lazyvim
- Tmux + sistema de plugins
- ZSH + Oh-my-zsh + plugins de auto-completations
- Docker ou Podman
- Git e seus alias
- Recentemente o Startship

E é ai que entra o Omarchy: by default ele vem com essas ferramentas instaladas e pré-configuradas da forma como eu costumo usar (menos o zsh pois o Omarchy vem com o bash configurado), logo por quê não unir o fator Arch + a base do setup que costumo usar + configuracões de atalhos?

## Instalacão

O processo de instalacão do Omarchy pode ser feito de duas formas:
1. [instalacão manual](https://learn.omacom.io/2/the-omarchy-manual/96/manual-installation), onde você o archlinux e depois executar o comando que baixa e executa os scripts do Omarchy
2. baixa a iso e realiza a instalacão.

Como a configuracão padrão da ISO leva em consideracão coisas como: BRTFS, apenas um disco para toda a instalacão, usa o Limine como bootloader ao invês do GRUB e Snapper como ferramenta de snapshots e rollback, logo decidi ir com a iso mesmo. Como meu novo setup não é um notebook e só eu uso, logo faz mais sentido ter uma senha no boot protegendo o disco inteiro e a inicializacão e logar direto no meu usuário.

## Mudancas

Como eu disse anteriormente o Omarchy vem com QUASE tudo que eu costumo usar, e tem algumas configuracoes que eu precisie fazer para ele ficar de acordo com o que eu queria.

### ZSH

Por padrão o Omarchy vem com o bash e sem uma forma oficial de realizar o replace para o zsh. Então a primeira coisa que fiz foi instalar o zsh e os principais plugins:

```bash
yay -S zsh zsh-autosuggestions zsh-syntax-highlighting
```

E como eu uso a combinacão zsh + [oh-my-zsh](https://ohmyz.sh/) também fiz a instalacão:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

O Omarchy possui diversos arquivos de configuracão proprio para o bash e todos eles podem ser vistos na pasta `~/.local/share/omarchy/default/bash/`.

Um exemplo de arquivo que precisa ser atualizado é o `init` que possui essa configuracão:

```config
if command -v mise &> /dev/null; then
  eval "$(mise activate bash)"
fi

if command -v starship &> /dev/null; then
  eval "$(starship init bash)"
fi
...
```

Então alterei o meu `.zshrc` para ficar com os seguintes imports e manter alguns imports to bash do Omarchy.

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


