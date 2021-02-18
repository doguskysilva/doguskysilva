import Link from "next/link";

const PostPreview = (props) => (
  <div className="mb-4">
    <h1>
      <a href={`/posts/${props.post.slug}`}>
        {props.post.title}  
      </a>  
    </h1>
    <p>{props.post.date}</p>
    <p>{props.post.excerpt}</p>
    {/* <Link href={`/posts/${props.post.slug}`}></Link> */}
  </div>
)

export default PostPreview