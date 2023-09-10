---
draft: false
slug: hello-world
title: Hello World!
date: 2021-04-06
tags:
  - blog
  - nextjs
summary: Assim como em todo novo curso relacionado a programação, esse será o
  meu "hello world". Descrevo um pouco do porquê de ter criado esse espaço o que usei para construir esse espaço.
authors:
  - default
layout: PostLayout
---

## Por quê

Umas das coisas que mais gosto de fazer é compartilhar as coisas que aprendo. Quando tinha por volta dos 16 anos, eu já era professor de informática e gostava muito do que fazia, principalmente pelo movito de querer sempre estar preparado para poder responder aos alunos e levar o conteúdo de forma mais interessantes.

Depois quando comecei a trabalhar com desenvolvimento de software, se manter atualizado, pesquisar, e até mesmo propor soluções se tornou algo do dia-a-dia, e de alguma forma isso acabava indo parar em algumas das conversas com meus colegas de faculdade, pois se tem algo que eu faço bem é de falar, e como eu falo!

No fim, eu quis de fato poder pegar tudo que aprendi e descobri, e colocar em um local para que sirva tanto como registro para mim e para que outras pessoas possam ter acesso.

## Como?

Agora vamos para a parte técnica da coisa: o que eu usei para construir esse meu site, com uma seção de blog dentro? A principio eu queria algo extremamente simples, sem precisar de banco de dados, sem precisar levantar um servidor rodando um PHP, Ruby ou Python da vida, e veio a primeira parte da ideia, que era usar Static Site Generator (SSG) para gerar as páginas HTML de forma estática.

Como eu estava a um tempo tentando fazer algo mais útil com [ReactJS](https://pt-br.reactjs.org/), eu optei pelo [Next.js](https://nextjs.org/), principalmente pela facilidade de poder criar novas páginas e no fim gerar todos os arquivos estáticos.

![Exemplo da página inicial do site](/static/images/blog/index-page.png 'Image Used')

Para gerenciar os conteúdos o [Netflify CMS](https://www.netlifycms.org/) serviu muito bem: simples, se integra fácil a qualquer ferramenta do conceito Jamstack, possui um workflow intuitivo e usa o GitHub como autenticação para acesso. Outro ponto interessante é que ele utiliza o Git com workflow, sendo assim ele mantém texto que ainda estão sendo escritos em um Pull Request separado e ao terminar e publicar, ele coloca na branch principal.

E como hospodegem utilizei o próprio serviço da [Netlify](https://www.netlify.com/), que permite um processo de integração com o GitHub, logo toda vez que eu subo uma alteração no GitHub o serviço da Netlify executa o processo de deploy, publicando as alterações.

Obviamente eu utilizei um template pronto como base, o [Tailwind NextJS Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).
