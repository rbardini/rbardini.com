import { document } from '../components/document.ts'
import { head } from '../components/head.ts'
import { postItem } from '../components/post-item.ts'
import { Context } from '../types.ts'
import { html } from '../utils/html.ts'

export default function ({ posts }: Context) {
  const postsByYear = posts.reduce<Record<number, Array<(typeof posts)[number]>>>(
    (acc, post) => ((acc[post.date.getFullYear()] ??= []).push(post), acc),
    {},
  )

  return document({
    head: head({ title: 'Archive' }),
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
