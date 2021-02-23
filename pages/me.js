import Head from 'next/head'
import Link from 'next/link'
import Layout from '../_components/layout'

function Me() {  
  return (
    <Layout>
      <Head>
        <title>E Agora Eu | dogusky.techa</title>
      </Head>
      <article className="px-6 py-3 lg:px-10 lg:py-5">
        <header className="mb-2 text-center">
          <h1 className="text-3xl font-bold tracking-wide">E Agora Eu!</h1>
          <img
            className="rounded-full w-36 border-2 border-white m-auto my-6"
            src="/images/eu.jpeg"
            alt="Sou eu"
          />
        </header>
        <section className="text-justify">
          <h2 className="font-bold text-2xl mt-6 mb-2">Você não sabe nada de mim...</h2>
          <p>
            Olá, eu sou o Douglas, nasci em Ariquemes uma cidade no interior do estado de Rondônia. Atualmente moro em São Paulo, trabalho com desenvolvimento de software no LuizaLabs e curso Engenharia da Computação na <a href="https://www.fiap.com.br" className="font-semibold hover:underline" rel="noreferrer" target="_blank">FIAP</a>
          </p>

          <h2 className="font-bold text-2xl mt-6 mb-2">Quando te encontrei...</h2>
          <p className="mt-4">
            Acabei descobrindo o universo da programação em uma aula no Senai em 2011. Vi um código sendo escrito pelo professor em Object Pascal e depois de automagicamente um <b>jogo da velha</b>. Depois disso nem prestava mais atenção nas aulas de redes, e lá estava eu assisinto vídeo aulas e praticando desenvolvimento web.
          </p>
    
          <h2 className="font-bold text-2xl mt-6 mb-2">Maravilha...</h2>
          <p>
            Torcedor do Golden State Warrios, sou fanático por assistir e jogar basquete.
            Sou casado com uma mulher incrível chamado Maysa Michalski e temos um cachorro chamado Hades.
          </p>

          <h2 className="font-bold text-2xl mt-6 mb-2">E Agora...</h2>
          <p className="pb-3">
            Na minha <Link href="/bookshelf">estante</Link>, você pode ver os livros que li ou estou lendo quando se trata da área da computação.
            Para saber como eu escrevi esse site veja as <a className="font-semibold hover:underline" href="/">tecnologias que eu usei</a>
            <br/>E você pode me encontrar nas seguintes redes:
            <div className="flex mt-4">
              <a className="mr-3" href="https://github.com/doguskysilva" rel="noreferrer" target="_blank">
                <img src="https://img.shields.io/github/followers/doguskysilva?label=%40doguskysilva&style=social"/>
              </a>
              <a className="mr-3" href="https://twitter.com/doguskysilva" rel="noreferrer" target="_blank">
                <img src="https://img.shields.io/twitter/follow/doguskysilva?label=%40doguskysilva&style=social"/>
              </a>
              <a className="mr-3" href="https://www.linkedin.com/in/douglas-silva-michalski" rel="noreferrer" target="_blank">
                <img src="https://img.shields.io/badge/linkedin-Douglas%20Silva-blue?logo=linkedin&amp;style=social"/>
              </a>
            </div>
          </p>
        </section>
      </article>
    </Layout>
  )
}

export default Me