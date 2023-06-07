import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import pkg from '../../package.json'
import { getPostsForRSS } from '../content/config'

export function get(context: APIContext) {
  const posts = getPostsForRSS().slice(0, 20)

  return rss({
    title: pkg.name,
    description: pkg.description,
    site: context.site!.href,
    items: posts.map(post => ({
      title: [post.frontmatter.title, post.frontmatter.link && '→'].filter(Boolean).join(' '),
      description: [post.compiledContent(), post.frontmatter.link && `<p><a href="/${post.slug}" rel="bookmark">∞ Permalink</a></p>`].filter(Boolean).join('\n'),
      link: post.frontmatter.link ?? `/${post.slug}`,
      pubDate: post.frontmatter.date as unknown as Date,
    }))
  })
}
