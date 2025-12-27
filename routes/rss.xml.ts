import { Feed } from '$feed'
import { site } from '../constants.ts'
import type { RouteContext } from '../types.ts'
import { renderMarkdown } from '../utils/markdown.ts'

const MAX_ITEMS = 20

export default function ({ posts }: RouteContext) {
  const feed = new Feed({
    id: site.url,
    link: site.url,
    title: site.name,
    description: site.description,
    author: { name: site.author },
    copyright: site.license,
    feed: site.feed,
  })

  posts.slice(0, MAX_ITEMS).forEach((post) => {
    const url = new URL(`/${post.slug}/`, site.url)
    feed.addItem({
      title: post.title.concat(post.link ? ' ↗' : ''),
      description: [
        renderMarkdown(post.markdown),
        post.link && `<p><a href="${url}" rel="bookmark">∞ Permalink</a></p>`,
      ]
        .filter(Boolean)
        .join('\n'),
      link: post.link ?? url.href,
      date: post.date,
      category: post.tags.slice(1).map((tag) => ({ name: tag })),
    })
  })

  return feed.rss2()
}
