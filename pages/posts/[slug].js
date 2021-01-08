import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllPosts, getPostBySlug } from './../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

function Post({ post, morePost, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return <div>{JSON.stringify(post)}</div>
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'content'
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}

export default Post
