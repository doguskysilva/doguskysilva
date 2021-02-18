import PostPreview from '../_components/post_preview'
import { getAllPosts } from './../lib/api'

function Blog(props) {
    return <div>
      { props.posts.map(post => <PostPreview post={post} ></PostPreview> )}
    </div>
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts([
    'slug',
    'title',
    'date',
    'excerpt',
    'author',
    'ogImage',
    'coverImage'
  ])

   return {
    props: {
      posts: posts
    }
  }
}

export default Blog