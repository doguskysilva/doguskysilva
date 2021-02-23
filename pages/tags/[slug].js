import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllTags, getPostsByTag } from '../../lib/api'
import Head from 'next/head'
import PostPreview from '../../_components/post_preview'
import Layout from '../../_components/layout'

function TagPosts({ tag, posts }) {
  // const router = useRouter()
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }

  return (
    <Layout>
      <Head>
        <title>tag {tag} | dogusky.tech</title>
      </Head>
      <div className="px-6 py-3 lg:px-10 lg:py-5">
        <header>
          <h1 className="text-3xl font-semibold tracking-wide">
            <span className="border-b border-white"> Posts com a tag: {tag}</span>
          </h1>
        </header>
        <div className="">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          { posts.map(post => <li className="py-8">
              <PostPreview post={post} ></PostPreview>
            </li> 
          )}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const tag = params.slug
  const posts = getPostsByTag(tag, [
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
      tag: tag,
      posts: posts
    }
  }
}

export async function getStaticPaths() {
  const tags = getAllTags()
  return {
    paths: Object.keys(tags).map(tag => {
      return {
        params: {
          slug: tag
        }
      }
    }),
    fallback: false
  }
}

export default TagPosts
