import Head from 'next/head'
import Link from 'next/link'
import { nonTechnicalBooks, technicalBooks } from '../_api/books'
import CardBook from '../_components/card_book'



function BookShelf() {
  return (
    <>
      <Head>
        <title>Minha Estante | doguskysilva</title>
      </Head>
      <article className="mt-2 md:mt-6 lg:mx-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-wide">Minha Estante</h1>
          <p className="mt-6">
            Alguns livros contribuiram para meu conhecimento em desenvolvimento de software e desenvolvimento pessoal. E nada mais justo do que compartilhar isso com as outras pessoas.
            Para facilitar eles foram separados em: 
            <ul className="list-disc ml-8 mt-4">
              <li>
                <Link href="#software_books">
                  <a className="hover:underline font-semibold">
                    Livros relacionados a programação
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#others_books">
                  <a className="hover:underline font-semibold">
                    outros assuntos
                  </a>
                </Link>
              </li>
            </ul> 
          </p>
        </header>

        <section id="software_books" className="mt-4">
          <h2 className="text-2xl font-bold tracking-wide">
            <Link href="#software_books">
              <a className="hover:underline">
                Livros relacionados a programação
              </a>
            </Link>
          </h2>
          { technicalBooks().map(book => <CardBook book={book}></CardBook>) }
        </section>

        <section id="others_books" className="mt-4">
          <h2 className="text-2xl font-bold tracking-wide">
            <Link href="#others_books">
              <a className="hover:underline">
                Livros não relacionados a programação
              </a>
            </Link>
          </h2>
          { nonTechnicalBooks().map(book => <CardBook book={book}></CardBook>) }
        </section>
      </article>
    </>
  )
}

export default BookShelf