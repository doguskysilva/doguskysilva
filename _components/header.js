import Link from 'next/link'

const menuOptions = [
  { "link": "/blog", "content": "Blog" },
  { "link": "/projects", "content": "Projetos" },
  { "link": "/bookshelf", "content": "Estante" },
  { "link": "/me", "content": "Eu" },
]

const Header = () => <>
  <nav className="cols-span-1 md:col-span-1 h-24 md:h-full bg-blueGray-600 md:p-4 text-white">
    <div className="flex flex-col h-full">
      <div className="flex-initial">
        <ul className="flex justify-between p-1">
          {
            menuOptions.map(option => {
              return (
                <li className="lowercase font-light" key={option.link}>
                  <Link href={option.link}>
                    <a
                      className="inline-block py-1 px-3 font-medium hover:bg-blueGray-500 transition duration-500 ease-in-out">
                      {option.content}
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>

      <div className="hidden md:flex flex-auto items-center px-4">
        <div>
          <h1 className="block text-4xl font-bold mb-4 text-center lg:text-left">
            Douglas <span className="text-gray-400">Silva</span>
          </h1>
          <p className="block text-base text-gray-300 text-justify py-3">
            Desenvolvedor e nas horas escrevendo sobre programação.
            </p>
        </div>
      </div>

      <div className="hidden md:block flex-initial text-center">
        <div className="block p-2">
        </div>
          © {new Date().getFullYear()}, Douglas Silva. Feito com
          {` `}
        <a href="https://www.nextjs.org" className="hover:text-gray-500 underline hover:no-underline" target="_blank" rel="noreferrer">NextJS</a> e <a href="https://www.tailwindcss.com" className="hover:text-gray-500 underline hover:no-underline" target="_blank" rel="noreferrer">Tailwindcss</a>
      </div>
    </div>
  </nav>
</>

export default Header