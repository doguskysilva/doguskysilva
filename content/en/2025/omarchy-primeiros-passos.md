---
id: 2f9f9961-2af4-4cad-9c09-4b8ffbc49ac3-en
title: "Omarchy: first steps"
description: "My experience migrating to Omarchy, setting up my development environment, and adjusting tools like ZSH, Neovim, and Tmux."
date: "2025-10-13"
categories:
  - linux
  - development
  - personal
tags:
  - omarchy
  - archlinux
  - zsh
  - tmux
  - neovim
---

Recently, I started putting together a new setup. I used to work exclusively on a MacBook Air M1, and now I also have a desktop machine. Since 2017, I haven't used Windows as my daily driver — I've always worked with some Linux distribution, starting with Ubuntu and later moving to Fedora. In 2024, looking for something new, I started experimenting with Arch, installing only what I truly needed for my daily workflow.

I came across DHH's Omakub project, which is Ubuntu-based, but shortly after a version aimed at Arch appeared: [Omarchy](https://omarchy.org/).

## Why Omarchy?

I've always configured my machines for study and software development, keeping only what I actually use.
I'm a "terminal guy" — a big part of my day goes through CLI tools like Tmux, Neovim, Git, Docker, and others tied to the languages I study or work with. For almost everything, I've built shortcuts that speed up my workflow.

Even on macOS, my basic setup included a terminal, Neovim + LazyVim, Tmux with plugins, ZSH + Oh-my-zsh, Docker or Podman, Git with aliases, and more recently Starship.

Omarchy fits right in: it comes with these tools already installed and pre-configured (except ZSH — it ships with Bash). Combining Arch, my usual setup, and my shortcuts felt like the ideal choice.

## Installation

Omarchy can be installed in two ways: [manually](https://learn.omacom.io/2/the-omarchy-manual/96/manual-installation), by installing Arch first and then running the Omarchy scripts, or by using the direct ISO.
I went with the ISO, which already comes with a default setup using BTRFS, Limine as the bootloader, and Snapper for snapshots and rollback. Since this is a personal desktop, I configured boot protection and automatic login with my user account.

---

*The rest of this article — covering ZSH, Tmux, and Neovim post-installation tweaks — is available in the [Portuguese version](/2025/omarchy-primeiros-passos).*
