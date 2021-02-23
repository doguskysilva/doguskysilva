import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const menuOptions = [
  { 'link': '/', 'content': 'Bem Vindo', 'sm_content': 'Welcome' },
  { 'link': '/blog', 'content': 'O que escrevo', 'sm_content': 'Blog' },
  // { 'link': '/tags', 'content': 'Tags' },
  { 'link': '/bookshelf', 'content': 'O que Leio', 'sm_content': 'Estante' },
  { 'link': '/me', 'content': 'Sobre Mim', 'sm_content': 'Eu' },
]

const LinkActive = ({ href, children }) => {
  const router = useRouter()

  let className = children.props.className || ''
  let activeClasses = 'active'
  if (router.pathname === href) {
    className = `${className} ${activeClasses}`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}


const LinkMenu = ({itemMenu}) => (
  <li className='block lg:mt-5 relative'>
    <LinkActive href={itemMenu.link}>
      <a className='block p-3 lg:p-4 lg:pb-2 lg:pr-0 link-menu'>
        <span className='hidden lg:inline'>{itemMenu.content}</span>
        <span className='inline lg:hidden'>{itemMenu.sm_content}</span>
      </a>
    </LinkActive>
  </li>
)

const Navbar = () => (
  <section className='flex flex-wrap content-center w-full lg:w-3/12 h-auto lg:h-full p-2 lg:p-4 bg-black bg-opacity-80'>
    <nav className='w-full lg:p-8 lg:pr-6 lg:text-right uppercase text-sm font-normal text-white text-opacity-50'>
      <ul className='flex flex-row lg:flex-col justify-around'>
        { menuOptions.map(itemMenu => <LinkMenu key={itemMenu.link} itemMenu={itemMenu} />) }
      </ul>
    </nav>
  </section>
)

export default Navbar