import { document } from '../components/document.ts'
import { head } from '../components/head.ts'
import { post as postComponent } from '../components/post.ts'
import { Context } from '../types.ts'

export default function ({ posts }: Context) {
  return posts.flatMap((post) => [
    [
      post.slug,
      document({
        head: head(post),
        body: postComponent({ post }),
      }),
    ],
    [post.slug.concat('.md'), post.markdown],
  ])
}
