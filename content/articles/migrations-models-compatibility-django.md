---
cover: /articles/write-articles.webp
title: 'Django: compatibilidate de migrations e models'
date: 2021-04-10T03:00:00.000Z
author:
  name: Douglas Silva
  avatarUrl: https://pbs.twimg.com/profile_images/1370286658432724996/ZMSDzzIi_400x400.jpg
  link: https://twitter.com/doguskysilva
description: Ao trabalhar em um projeto desenvolvido com Django, problemas com migrations podem surgir ao longo do tempo, principalmente quando temos inserção de dados, pois tabelas e models mudam ao longo do tempo e garantir a compatibilidade nesse contexto é fundamental para mantermos um bom histórico de migrations.
layout: article
badges: [{
  color: 'white',
  bg: 'rgba(0, 0, 0, 0.3)',
  content: 'Django'
}]
---

## Cenário

No projeto hipotético existe um _model_ chamado **Profile** que tem como objetivo manter as configurações padrões para perfis dentro do sistema:

```python
# models.py

from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
```

Por ser um _model_ que só interessa a parte interna do sistema, uma _migration_ adiciona alguns perfis inicialmente na aplicação:

```python
# 0003_insert_data_profile.py

from django.db import migrations, models
from application.models import Profile

def insert_data(apps, schema_editor):
    Profile.objects.create(name='Manager', description='Perfil de acesso superior')
    Profile.objects.create(name='Visitor', description='Perfil de visita, para acesso temporário')

class Migration(migrations.Migration):

    dependencies = [('migrations', '0002_profile')]

    operations = [
        migrations.RunPython(insert_data),
    ]
```

Até esse ponto tudo bem. Se colocarmos em produção tudo ira ocorrer bem e caso um outro desenvolvedor pegue o código, e execute as _migrations_ tudo continuará funcionando.

## O Problema

Depois de um determinado tempo, foi requisitado que se adicionasse uma nova coluna em **Profile** chamada **is_active** quer irá determinar se um **Profile** está ou não ativo:

```python
# models.py

from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    is_active = models.Boolean(default=True)
```

Consequentemente uma _migration_ será criada para adicionar essa nova coluna em nosso banco de dados:

```python
#0004_profile_is_active.py

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0003_insert_data_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
```

Se pegarmos esses novos arquivos e depois enviarmos para nosso ambiente de staging ou produção e executarmos as _migrations,_ nosso processo continuará funcionando normalmente, pois apenas as novas _migrations_ serão executadas. Mas e se alguém pegar o projeto e executar as _migrations_ a partir do ínicio, como acontece quando iniciamos nossa base de desenvolvimento ou quando executamos um suite de testes que rodam todas nossas _migrations_?

![Imagem com erro do processo de migration](/static/images/blog/erros_migration.png)

Temos o erro acima! E por que isso acontece?

Quando criamos inserção de dados em nossas _migrations_ e nos referenciamos ao _model_ de forma direta, ao executar as _migrations,_ ele pega todas as colunas existentes dentro do _model_ e as usa para criar um *insert**\*.** Nesse caso a coluna **is_active** ainda não existe no nosso banco de dados, vela é criado apenas na *migration\* **0004_profile_is_active.py**

Esse erro aparace tanto para colunas novas, colunas que são removidas ao longo do tempo e colunas que em algum momento foram renomeadas. E como podemos assegurar que nossas _migrations_ que insere dados não fique dependendo de alterações manuais nos arquivos anteriores toda vez que alterarmos um campo dentro de uma _model_?

## A Solução

Parte da solução segue a lógica de acompanhar o _model_ durante suas modificações dentro das _migrations_! Ou seja e se pudéssemos não nos referenciar ao _model_ **Profile** que está no modulo _models_, mas sim para para um _model_ que está sendo modificado durante o tempo de execução e respeitar a linha do tempo?

Felizmente o Django nos oferece tal ferramenta e lhes apresentos: [`apps.get_model()`](https://docs.djangoproject.com/en/3.0/ref/applications/#django.apps.apps.get_model)``

Primeiro vamos análisar esse método. Ele retorna um _model_ de uma _app_, mas esse model não é o definido no arquivo **models.py** mas sim um que foi criado ou alterado pelo processo de _migrations_, e quando o recuperaos através do `apps.get_model()`, então o model recuperado tem as mesmas propriedades que o nosso banco de dados e ao criar um insert todos os campos estarão corretos.

Analisando o [`apps.get_models()`](https://docs.djangoproject.com/en/3.0/ref/applications/#django.apps.apps.get_model) podemos ver que ele pode receber três parâmetros:

- **_app_label_:** que irá receber o nome do app onde está nossos _models_, que no nosso exemplo chama-se _application._
- **_model_name:_** recebe o nome do _model_ que queremos acessar que é o _Profile._
- **_required_ready:_** quando recebe o valor False ele pega o _model_ propriamente dito e não o que estã sendo alterado durante as _migrations_

Logo, para nossas _migrations_ voltarem a funcionar novamente precisamos alterar como iremos referenciar a variável **Profile**:

```python
# 0003_insert_data_profile.py

from django.db import migrations, models

def insert_data(apps, schema_editor):
    Profile = apps.get_model('application', 'Profile')

    Profile.objects.create(name='Manager', description='Perfil de acesso superior')
    Profile.objects.create(name='Visitor', description='Perfil de visita, para acesso temporário')


class Migration(migrations.Migration):

    dependencies = [('migrations', '0002_profile')]

    operations = [
        migrations.RunPython(insert_data),
    ]
```

Nesse momento estamos recuperando da árvore de _migrations_ um _model_ **Profile** que possui apenas os campos **name** e **description.** Depois da _migration_ **0004_profile_is_active.py**, caso seja necessário adicionar novos dados poderiamos criar um novo **Profile** com campo **is_active**, pois tanto o _model_ **Profile** quanto o banco de dados já possuem o campo/coluna **is_active**:

```python
# 0005_insert__more_data_profile.py

from django.db import migrations, models

def insert_data(apps, schema_editor):
    Profile = apps.get_model('application', 'Profile')

    Profile.objects.create(
        name='Guest',
        description='Perfil de acesso que não precisa ser identificado',
        is_active=False
    )


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0004_profile_is_active'),
    ]

    operations = [
        migrations.RunPython(insert_data),
    ]
```

Bom e como podemos ver que essa linha do tempo existe, e determinado _model_ e está recendo novos campos ao longo do processo de _migrations_? Imprimindo todos os fields de um _model_ utilizando o `Profile._meta.get_models()`, e para isso podemos usar a função `print().`

```python
# 0003_insert_data_profile.py

from django.db import migrations, models

def insert_data(apps, schema_editor):
    Profile = apps.get_model('application', 'Profile')
    print(Profile._meta.get_fields())

    Profile.objects.create(name='Manager', description='Perfil de acesso superior')
    Profile.objects.create(name='Visitor', description='Perfil de visita, para acesso temporário')


class Migration(migrations.Migration):

    dependencies = [('migrations', '0002_profile')]

    operations = [
        migrations.RunPython(insert_data),
    ]
```

```python
#0005_insert_more_data_profile

from django.db import migrations, models

def insert_data(apps, schema_editor):
    Profile = apps.get_model('application', 'Profile')
    print(Profile._meta.get_fields())

    Profile.objects.create(
        name='Guest',
        description='Perfil de acesso que não precisa ser identificado',
        is_active=False
    )


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0004_profile_is_active'),
    ]

    operations = [
        migrations.RunPython(insert_data),
    ]
```

E teremos o seguinte resultado:

```bash
Applying application.0001_initial... OK
  Applying application.0002_profile... OK
  Applying application.0003_insert_data_profile...(
  <django.db.models.fields.BigAutoField: id>,
  <django.db.models.fields.CharField: name>,
  <django.db.models.fields.CharField: description>)
 OK
  Applying application.0004_profile_is_active... OK
  Applying application.0005_insert_data_profile...(
  <django.db.models.fields.BigAutoField: id>,
  <django.db.models.fields.CharField: name>,
  <django.db.models.fields.CharField: description>,
  <django.db.models.fields.BooleanField: is_active>)
 OK
```

Interessante né?

E sim, você pode alterar _migrations_ antigas que faz o processo de inserção de dados, se referenciando o _model_ usando o `apps.get_model()` e manter a devida compatibilidade.

Caso tenha algumas dúvida, deixe na caixa de comentários abaixo ou pode entrar em contato comigo em uma das minha redes.
