---
cover: /articles/deploying.png
date: 2025-11-25
author:
  name: Douglas Silva
  avatarUrl: https://pbs.twimg.com/profile_images/1370286658432724996/ZMSDzzIi_400x400.jpg
  link: https://twitter.com/doguskysilva
layout: article
---

# Deploying a PHP application - Starting a saga!
Imagine que você passou suas últimas semanas e meses desenvolvendo uma aplicação e chegou a hora de colocá-la no ar! Durante esses 10 anos de carreira como desenvolvedor de software, apenas nos primeiros anos eu precisei de fato montar soluções de servidores para manter alguns projetos. De 2017 até hoje, a maioria das empresas em que trabalhei tinha uma equipe responsável por DevOps e todos os servidores e deploy estavam bem estruturados, ou a aplicação estava em serviços como o Digital Ocean, onde basicamente o repositório estava conectado a um app service e o banco de dados já usava a infraestrutura.

Com isso, me veio a vontade de ver como estão hoje em dia (Nov/2024) os vários tipos de soluções para o processo de disponibilizar uma aplicação no ar. Mas aqui não estou analisando soluções prontas como Heroku, Digital Ocean, um app service do Google Cloud, Azure ou AWS. Onde eu posso simplesmente conectar meu repositório nessas soluções, e toda vez que atualizar a main ou master do meu repositório, minha aplicação automaticamente atualiza. A ideia é explorar cenários onde:

- exista um servidor VPS (Virtual Private Server)
- a aplicação esteja instalada diretamente no servidor, sem containers
- atualizar a aplicação puxando o código do repositório utilizando o próprio servidor através de comandos (forma ativa)
- atualizar a aplicação utilizando alguma ferramenta de CI/CD (Continuous Integration/Continuous Deployment) após o processo de atualização do repositório (forma passiva)
- utilizar alguma solução envolvendo containers dentro de uma VPS
- atualizar o container sempre que uma nova imagem for gerada após a atualização da aplicação.

Aqui, a ideia é descrever cada ferramenta, comandos, arquivos de configuração e técnicas para poder resolver os cenários citados acima.

Mas por que fazer isso? Por que não simplesmente usar um Heroku ou DigitalOcean? Simples, nem sempre esses cenários estarão disponíveis. Além do mais, poder ter acesso a máquinas não compartilhadas como VPS pode, em alguns cenários, sair mais barato, além de entregar uma previsibilidade maior de custos.

Por isso, irei dividir em vários posts que farei ao longo de algumas semanas. Como base de código, irei inicialmente utilizar um projeto em Laravel. Apenas uma simples aplicação, com banco de dados SQLite3. Como repositório, irei utilizar o Github para manter o código fonte.

Com isso definido, no próximo post irei realizar o processo para implementar o primeiro cenário: um servidor VPS com o código colocado diretamente nele sem o uso de containers e realizando o processo de deploy, puxando o código atualizado e executando as migrations no banco de dados.
