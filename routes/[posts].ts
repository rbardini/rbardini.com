import { document } from '../components/document.ts'
import { head } from '../components/head.ts'
import { post as postComponent } from '../components/post.ts'
import type { RouteContext } from '../types.ts'

export default function ({ posts }: RouteContext) {
  return posts.flatMap((post) => [
    [
      post.slug,
      document({
        head: head({ name: post.slug, title: post.title }),
        body: postComponent({ post }),
      }),
    ],
    [post.slug.concat('.md'), post.markdown],
  ])
}
