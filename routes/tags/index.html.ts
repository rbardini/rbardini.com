import { html } from '@rbardini/html'
import { document } from '../../components/document.ts'
import { head } from '../../components/head.ts'
import { postItem } from '../../components/post-item.ts'
import { Route } from '../../constants.ts'
import type { RouteContext } from '../../types.ts'
import { groupPostsByTag } from '../../utils/posts.ts'

export default function ({ name, posts }: RouteContext) {
  return document({
    head: head({ name, title: 'Tags' }),
    body: html`<article>
      <h1>Tags</h1>
      ${
      [...groupPostsByTag(posts)].map(
        ([tag, posts]) =>
          html`<section>
            <h2><a href="${Route.Tags + tag}/">#${tag}</a></h2>
            <ul>
              ${posts.map((post) => postItem({ post }))}
            </ul>
          </section>`,
      )
    }
    </article>`,
  })
}
