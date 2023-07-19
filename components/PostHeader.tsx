import { Post } from "/utils/posts.ts"

export type PostHeaderProps = {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header>
      <a href={`/${post.slug}`} rel="bookmark" title="Permalink">
        <time>
          {new Date(post.date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </a>
      <h1>
        <a href={post.link ?? `/${post.slug}`} rel={post.link && "external"}>
          {post.title}
        </a>
      </h1>
    </header>
  )
}
