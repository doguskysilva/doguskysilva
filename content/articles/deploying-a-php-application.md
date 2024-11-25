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
Imagine that you've spent the last few weeks and months developing an application, and now it's time to deploy it! During these 10 years of my career as a software developer, only in the early years did I actually need to set up server solutions to maintain some projects. From 2017 until today, most of the companies I worked for either had a team responsible for DevOps and all the servers and deployment were well-structured, or the application was on services like Digital Ocean, where basically the repository was connected to an app service and the database already used the infrastructure.

This made me curious to see how the various types of solutions for the process of putting an application online are nowadays (Nov/2024). But here I am not analyzing ready-made solutions like Heroku, Digital Ocean, an app service from Google Cloud, Azure, or AWS, where I can simply connect my repository to these solutions, and every time I update the `main` or `master` branch of my repository, my application magically updates. The idea is to explore scenarios where:

- there is a VPS (Virtual Private Server)
- the application is installed directly on the server, without containers
- update the application by pulling the code from the repository using the server itself through commands (active form)
- update the application using some CI/CD (Continuous Integration/Continuous Deployment) tool after the repository update process (passive form)
- use some solution involving containers within a VPS
- update the container whenever a new image is generated after the application update.

Here, the idea is to describe each tool, commands, configuration files, and techniques to solve the above scenarios.

But why do this? Why not simply use a Heroku or DigitalOcean? Simple, these scenarios will not always be available. Moreover, having access to non-shared machines like VPS can, in some scenarios, be cheaper, besides delivering greater cost predictability.

That's why I will divide this into several posts that I will make over the next few weeks. As a code base, I will initially use a Laravel project. Just a simple application, with an SQLite3 database. As a repository, I will use GitHub to maintain the source code.

With that defined, in the next post I will carry out the process to implement the first scenario: a VPS server with the code placed directly on it without using containers and performing the deployment process, pulling the updated code and executing the database migrations.
