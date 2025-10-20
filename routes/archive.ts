import { html } from '@rbardini/html'
import { document } from '../components/document.ts'
import { head } from '../components/head.ts'
import { postItem } from '../components/post-item.ts'
import type { RouteContext } from '../types.ts'

export default function ({ name, posts }: RouteContext) {
  const postsByYear = posts.reduce<Record<number, Array<(typeof posts)[number]>>>(
    (acc, post) => ((acc[post.date.getFullYear()] ??= []).push(post), acc),
    {},
  )

  return document({
    head: head({ name, title: 'Archive' }),
    body: html`<article>
      <h1>Archive</h1>
      ${
      Object.entries(postsByYear)
        .map(([year, posts]) => [+year, posts] as const)
        .sort(([yearA], [yearB]) => yearB - yearA)
        .map(
          ([year, posts]) =>
            html`<section>
              <h2>${year}</h2>
              <ul>
                ${posts.map((post) => postItem({ post }))}
              </ul>
            </section>`,
        )
    }
    </article>`,
  })
}
