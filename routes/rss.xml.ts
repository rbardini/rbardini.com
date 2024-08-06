import { Feed } from '$feed'
import { site } from '../constants.ts'
import type { Context } from '../types.ts'
import { renderMarkdown } from '../utils/markdown.ts'

const MAX_ITEMS = 20

export default function ({ posts }: Context) {
  const feed = new Feed({
    id: site.url,
    title: site.name,
    description: site.description,
    author: { name: site.author },
    copyright: site.license,
  })

  posts.slice(0, MAX_ITEMS).forEach((post) =>
    feed.addItem({
      title: post.title.concat(post.link ? ' ↗' : ''),
      description: [
        renderMarkdown(post.markdown),
        post.link && `<p><a href="${new URL(`/${post.slug}/`, site.url)}" rel="bookmark">∞ Permalink</a></p>`,
      ]
        .filter(Boolean)
        .join('\n'),
      link: post.link ?? `/${post.slug}/`,
      date: post.date,
    })
  )

  return feed.rss2()
}
