import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import tinytime from 'tinytime'
import Tag from '../../_components/tag'
import Head from 'next/head'
import Layout from '../../_components/layout'

const postDateTemplate = tinytime('{MM} {DD}, {YYYY}')

function Post({ post, morePost, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} | dogusky.tech</title>
      </Head>
      <section className="px-6 py-3 lg:px-10 lg:py-5">
        <header className="pb-6">
          <div className="space-y-1 text-center">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {post.title}
              </h1>
            </div>
            <dl className="space-y-10 py-4 block">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time datetime={post.date}>
                    {postDateTemplate.render(new Date(post.date))}
                  </time>
                </dd>
              </div>
            </dl>
            <div>
              <span className="text-center">
                { post.tags.map(tag => ( <Tag tag={tag} /> )) }
              </span>
            </div>
          </div>
        </header>
        <article className="py-8 border-t border-b border-gray-700">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <footer className="block">
          
        </footer>
      </section>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'content',
    'author',
    'coverImage',
    'date',
    'tags'
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
