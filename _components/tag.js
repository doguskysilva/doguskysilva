import Link from 'next/link'
import Layout from '../_components/layout'

const Tag = ({ tag }) => (
  <Link href={`/tags/${tag}`}>
    <a className="mr-5 text-lightBlue-600 hover:bg-lightBlue-400 rounded-full px-2">
      {tag}
    </a>
  </Link>
)

export default Tag