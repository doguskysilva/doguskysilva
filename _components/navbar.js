import Link from 'next/link'

const menuOptions = [
  { "link": "/blog", "content": "Blog" },
  { "link": "/tags", "content": "Tags" },
  { "link": "/bookshelf", "content": "Estante" },
  { "link": "/me", "content": "Eu" },
]

const Navbar = () => <>
  <section className="bg-gray-400 text-white w-full lg:w-3/12">
    { menuOptions.map(itemMenu => <Link href={itemMenu.link}>{itemMenu.content}</Link>) }
  </section>
</>

export default Navbar