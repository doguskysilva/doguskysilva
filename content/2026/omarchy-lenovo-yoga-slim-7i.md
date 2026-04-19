---
title: Configurando o Lenovo Yoga Slim 7i com Omarchy
alternates:
  - hreflang: en-US
    href: /en/2026/omarchy-lenovo-yoga-slim-7i
author: doguskysilva
categories:
  - linux
  - hardware
date: 2026-04-18
description: Como configurei meu Lenovo Yoga Slim 7i para funcionar bem com o Omarchy, ajustando as configurações específicas do notebook.
draft: true
listed: true
nocomments: false
tags:
  - omarchy
  - lenovo
  - yoga-slim-7i
  - linux
  - hyprland
  - notebook
---

No começo de 2026 eu comprei um Lenovo Yoga Slim 7i com o Intel Core Ultra 5 para ser minha máquina portátil no dia-a-dia, servindo tanto para estudos quanto para projetos que não precisavam rodar emuladores do Android Studio. A primeira coisa que fiz foi baixar a ISO do [Omarchy](https://omarchy.org) e realizar o processo de instalação. Depois utilizei meus dotfiles que já estão configurados — veja [Omarchy: primeiros passos](/pt/posts/2025/omarchy-first-steps).

Mas o notebook tem algumas configurações a mais que precisam ser levadas em consideração quando se trata de Linux, e mais ainda quando se trata de Arch. Tratando-se de uma distro recente, algumas otimizações relacionadas a bateria, touchpad, tela, entre outros, precisam ser levadas em consideração.

## Power Management

O Arch não vem com nenhum gerenciador de energia ativo por padrão. Para o Intel Core Ultra 5, o `power-profiles-daemon` funciona melhor do que o TLP por ter suporte nativo ao Intel Platform Power Management Framework. O Omarchy já instala o `power-profiles-daemon`, então basta garantir que o serviço está ativo:

```bash
sudo systemctl enable --now power-profiles-daemon
```

Para alternar entre os perfis de energia (powersave, balanced, performance) diretamente pelo terminal:

```bash
powerprofilesctl set balanced
powerprofilesctl set power-saver
powerprofilesctl set performance
```

Para o limite de carga da bateria, o Yoga Slim 7i não expõe essa configuração via sysfs no Linux. A forma de configurar é diretamente na BIOS/UEFI, onde o Lenovo disponibiliza a opção de limitar a carga máxima para preservar a vida útil da bateria.

## Touchpad

O Hyprland usa o libinput para gerenciar o touchpad. O Omarchy tem um arquivo dedicado para isso em `~/.config/hypr/conf/input.conf`. As principais configurações que ajustei:

```text
input {
    touchpad {
        natural_scroll = true
        tap-to-click = true
        disable_while_typing = true
        scroll_factor = 0.3
    }
    gesture = 3, horizontal, workspace
    gesture = 3, up, dispatcher, exec, omarchy-launch-walker
}
```

O `scroll_factor` menor deixa o scroll mais preciso no dia a dia, e o `natural_scroll` segue o comportamento que já usava no macOS. Os gestos de 3 dedos habilitam trocar de workspace na horizontal e abrir o launcher com swipe para cima.

## Tela

O Yoga Slim 7i tem uma tela OLED de 14" com resolução WUXGA (1920x1200) e proporção 16:10, com suporte a 60Hz e 120Hz. No `~/.config/hypr/conf/monitors.conf`:

```text
monitor=,preferred,auto,1.25
```

O fator de escala `1.25` ficou bom para o meu uso diário. O Omarchy por padrão usa `1`, então esse ajuste foi necessário.

## Hyprland

O Omarchy define `SUPER+L` para alternar o layout de janelas e `SUPER+CTRL+L` para bloquear a tela. Preferi inverter: `SUPER+L` para bloquear, como é comum em outros sistemas. Em `~/.config/hypr/bindings.conf`:

```text
unbind = SUPER, L
unbind = SUPER CTRL, L
bindd = SUPER, L, Lock system, exec, omarchy-lock-screen
bindd = SUPER CTRL, L, Toggle workspace layout, exec, omarchy-hyprland-workspace-layout-toggle
```

Também ajustei o visual em `~/.config/hypr/looknfeel.conf`: reduzi os gaps, removi o arredondamento das janelas e habilitei a animação de slide entre workspaces:

```text
general {
    gaps_in = 4
    gaps_out = 6
}

animations {
    animation = workspaces, 1, 4, easeOutQuint, slide
}

decoration {
    rounding = 0
}
```

## Waybar

O formato padrão do relógio no Omarchy exibe apenas o dia da semana e o horário. Preferi incluir também o dia e o mês. Em `~/.config/waybar/config.jsonc`:

```jsonc
"clock": {
  "format": "{:L%A %d %B %H:%M}"
}
```

## Conclusão

O Lenovo Yoga Slim 7i rodando Omarchy ficou muito bom para o dia a dia. As configurações específicas do notebook — bateria, touchpad, tela, Hyprland e Waybar — foram as únicas que precisaram de atenção além da instalação padrão. O processo todo levou menos de uma hora, e boa parte do tempo foi pesquisando as configurações corretas para o Intel Core Ultra 5.

Se você tiver um notebook com hardware parecido, essas configurações devem funcionar como ponto de partida.
