import Head from 'next/head'
import PostPreview from '../_components/post_preview'
import { getAllPosts } from './../lib/api'

function Blog(props) {
  return (
    <>
      <Head>
        <title>Posts | dogusky.tech</title>
      </Head>
      <div className="-mt-6 px-6">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        { props.posts.map(post => <li className="py-8">
            <PostPreview post={post} ></PostPreview>
          </li> 
        )}
        </ul>
      </div>
    </>
    )
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts([
    'slug',
    'title',
    'date',
    'excerpt',
    'author',
    'ogImage',
    'coverImage',
    'tags'
  ])

   return {
    props: {
      posts: posts
    }
  }
}

export default Blog