---
id: f3ed94bb-b0d5-4340-9f28-bf05c26d6b37
title: Setting Up the Lenovo Yoga Slim 7i with Omarchy
description: How I configured my Lenovo Yoga Slim 7i to work well with Omarchy, adjusting the notebook-specific settings.
date: 2026-04-18
author: doguskysilva
categories:
  - linux
  - hardware
tags:
  - omarchy
  - lenovo
  - yoga-slim-7i
  - linux
  - hyprland
  - notebook
alternates:
  - hreflang: pt-BR
    href: /2026/omarchy-lenovo-yoga-slim-7i
draft: true
---

In early 2026, I bought a Lenovo Yoga Slim 7i with an Intel Core Ultra 5 to be my everyday portable machine — useful for both studying and projects that didn't require running Android Studio emulators. The first thing I did was download the Omarchy ISO and go through the installation process. After that, I applied my dotfiles, which are already set up — see [Omarchy: First Steps](/en/posts/2025/omarchy-first-steps).

But the laptop has some additional configuration that needs to be taken into account when it comes to Linux, and even more so with Arch. Being a fairly recent distro, some optimizations related to battery life, touchpad, screen, and other things are worth addressing.

## Power Management

Arch doesn't come with any energy manager active by default. For the Intel Core Ultra 5, `power-profiles-daemon` works better than TLP because it has native support for the Intel Platform Power Management Framework. Omarchy already installs `power-profiles-daemon`, so you just need to make sure the service is running:

```bash
sudo systemctl enable --now power-profiles-daemon
```

To switch between power profiles (powersave, balanced, performance) directly from the terminal:

```bash
powerprofilesctl set balanced
powerprofilesctl set power-saver
powerprofilesctl set performance
```

For battery charge limiting, the Yoga Slim 7i doesn't expose this setting via sysfs on Linux. The way to configure it is directly in the BIOS/UEFI, where Lenovo provides the option to cap the maximum charge to preserve battery longevity.

## Touchpad

Hyprland uses libinput to manage the touchpad. Omarchy has a dedicated file for input settings at `~/.config/hypr/conf/input.conf`. The main settings I adjusted:

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

The lower `scroll_factor` makes scrolling more precise day-to-day, and `natural_scroll` matches the behavior I was used to on macOS. The 3-finger gestures enable switching workspaces horizontally and opening the launcher with a swipe up.

## Screen

The Yoga Slim 7i has a 14" OLED screen with WUXGA resolution (1920x1200) and a 16:10 aspect ratio, supporting 60Hz. In `~/.config/hypr/conf/monitors.conf`:

```text
monitor=,preferred,auto,1.25
```

A scale factor of `1.25` worked well for my daily use. Omarchy defaults to `1`, so this adjustment was necessary.

## Hyprland

Omarchy maps `SUPER+L` to toggle the window layout and `SUPER+CTRL+L` to lock the screen. I preferred to swap them: `SUPER+L` to lock, as is common on other systems. In `~/.config/hypr/bindings.conf`:

```text
unbind = SUPER, L
unbind = SUPER CTRL, L
bindd = SUPER, L, Lock system, exec, omarchy-lock-screen
bindd = SUPER CTRL, L, Toggle workspace layout, exec, omarchy-hyprland-workspace-layout-toggle
```

I also adjusted the visuals in `~/.config/hypr/looknfeel.conf`: reduced gaps, removed window rounding, and enabled slide animation between workspaces:

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

The default Omarchy clock only shows the day of the week and time. I preferred to also include the day and month. In `~/.config/waybar/config.jsonc`:

```jsonc
"clock": {
  "format": "{:L%A %d %B %H:%M}"
}
```

## Conclusion

The Lenovo Yoga Slim 7i running Omarchy works really well day-to-day. The notebook-specific configurations — battery, touchpad, screen, Hyprland, and Waybar — were the only things that needed attention beyond the standard installation. The whole process took less than an hour, and most of that time was spent researching the right settings for the Intel Core Ultra 5.

If you have a laptop with similar hardware, these settings should work as a good starting point.
