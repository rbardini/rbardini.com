import { html } from '@rbardini/html'
import { document } from '../../components/document.ts'
import { head } from '../../components/head.ts'
import { postItem } from '../../components/post-item.ts'
import type { RouteContext } from '../../types.ts'
import { groupPostsByTag } from '../../utils/posts.ts'

export default function ({ name, posts }: RouteContext) {
  return [...groupPostsByTag(posts)].map(([tag, posts]) => {
    const slug = name.replace('[tag]', tag)

    return [
      slug,
      document({
        head: head({ name: slug, title: `#${tag}` }),
        body: html`<article>
          <h1>#${tag}</h1>
          <ul>
            ${posts.map((post) => postItem({ post }))}
          </ul>
        </article>`,
      }),
    ]
  })
}
