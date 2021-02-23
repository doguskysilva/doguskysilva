import Link from "next/link";
import tinytime from "tinytime"
import Tag from "./tag";


const postDateTemplate = tinytime('{MM} {DD}, {YYYY}')

const PostPreview = ({ post }) => (
  <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
    <div className="space-y-3 xl:col-span-4">
      <div>
        <h3 className="text-2xl font-bold leading-8 tracking-tight mb-2">
          <Link href={`/blog/${post.slug}`} className="text-gray-900 dark:text-gray-100">
            {post.title}
          </Link>
        </h3>
        <div className="flex flex-wrap">
          <dl className="mr-4">
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>
                {postDateTemplate.render(new Date(post.date))}
              </time>
            </dd>
          </dl>
          <span className="mr-2">-</span>
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag}></Tag>
          ))}
        </div>
      </div>
      <div className="prose text-gray-500 max-w-none dark:text-gray-300 text-justify">
        {post.excerpt}
      </div>
      <div className="text-base font-medium leading-6 pt-4">
        <Link href={`/blog/${post.slug}`}>
          <a class="text-blue-500 hover:text-blue-400" aria-label={post.title}>
            Leia mais →
          </a>
        </Link>
      </div>
    </div>
  </article>
)

export default PostPreview