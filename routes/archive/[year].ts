import { html } from '@rbardini/html'
import { document } from '../../components/document.ts'
import { head } from '../../components/head.ts'
import { postItem } from '../../components/post-item.ts'
import type { RouteContext } from '../../types.ts'
import { groupPostsByYear } from '../../utils/posts.ts'

export default function ({ name, posts }: RouteContext) {
  return [...groupPostsByYear(posts)].map(([year, posts]) => {
    const slug = name.replace('[year]', String(year))

    return [
      slug,
      document({
        head: head({ name: slug, title: String(year) }),
        body: html`<article>
          <h1>${year}</h1>
          <ul>
            ${posts.map((post) => postItem({ post }))}
          </ul>
        </article>`,
      }),
    ]
  })
}
