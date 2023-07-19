import { PostHeader } from "/components/PostHeader.tsx"
import { render } from "/utils/markdown.ts"
import { Post as PostType } from "/utils/posts.ts"

export type PostProps = {
  post: PostType
}

export function Post({ post }: PostProps) {
  return (
    <article>
      <PostHeader post={post} />
      {post.isOld && (
        <div class="disclaimer">
          <strong>Note:</strong>{" "}
          This is an old post. The opinions and views expressed here may not
          reflect the author's current thinking.
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: render(post.markdown) }} />
    </article>
  )
}
