import Link from 'next/link'
import Layout from '../_components/layout'

const Tag = ({ tag }) => (
  <Link href={`/tags/${tag}`}>
    <a className="mx-2 rounded px-2 text-lightBlue-500 hover:text-white hover:bg-lightBlue-500">
      {tag}
    </a>
  </Link>
)

export default Tag