import { Post } from "/utils/posts.ts"

export type PostItemProps = {
  post: Post
  dateFormat?: Intl.DateTimeFormatOptions
}

const defaultDateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "2-digit",
}

export function PostItem({
  post,
  dateFormat = defaultDateFormat,
}: PostItemProps) {
  return (
    <li>
      <time dateTime={post.date.toISOString()}>
        {post.date.toLocaleDateString("en-us", dateFormat)}
      </time>{" "}
      <a href={post.slug}>{post.title}</a>
    </li>
  )
}
