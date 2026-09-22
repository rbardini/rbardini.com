import { html } from '@rbardini/html'
import { document } from '../../components/document.ts'
import { head } from '../../components/head.ts'
import { postItem } from '../../components/post-item.ts'
import { Route } from '../../constants.ts'
import type { RouteContext } from '../../types.ts'
import { groupPostsByYear } from '../../utils/posts.ts'

export default function ({ name, posts }: RouteContext) {
  return document({
    head: head({ name, title: 'Archive' }),
    body: html`<article>
      <h1>Archive</h1>
      ${
      [...groupPostsByYear(posts)].map(
        ([year, posts]) =>
          html`<section>
            <h2><a href="${Route.Archive + year}/">${year}</a></h2>
            <ul>
              ${posts.map((post) => postItem({ post }))}
            </ul>
          </section>`,
      )
    }
    </article>`,
  })
}
