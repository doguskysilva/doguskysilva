import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const menuOptions = [
  { "link": "/", "content": "Bem Vindo" },
  { "link": "/blog", "content": "O que escrevo" },
  // { "link": "/tags", "content": "Tags" },
  { "link": "/bookshelf", "content": "O que Leio" },
  { "link": "/me", "content": "E agora Eu" },
]

const LinkActive = ({ href, children }) => {
  const router = useRouter()

  let className = children.props.className || ''
  let activeClasses = 'text-white border-gray-800'
  if (router.pathname === href) {
    className = `${className} ${activeClasses}`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}


const LinkMenu = ({itemMenu}) => (
  <li className='block mt-4'>
    <LinkActive href={itemMenu.link}>
      <a className="block p-4 pb-2 pr-0 border-b-2 border-gray-500 hover:text-gray-700">
        {itemMenu.content}
      </a>
    </LinkActive>
  </li>
)

const Navbar = () => (
  <section className='flex flex-wrap content-center w-full lg:w-3/12 h-full lg:h-auto p-4 bg-gray-400 text-white'>
    <nav className='w-full lg:p-8 lg:pr-6 lg:text-right uppercase text-sm font-semibold text-gray-500'>
      <ul className='flex flex-row lg:flex-col'>
        { menuOptions.map(itemMenu => <LinkMenu itemMenu={itemMenu} />) }
      </ul>
    </nav>
  </section>
)

export default Navbar