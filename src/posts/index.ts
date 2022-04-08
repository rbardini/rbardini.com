import type { MarkdownInstance, MarkdownParserResponse } from 'astro'
import type { AstroComponentFactory } from 'astro/dist/types/runtime/server'
import { DateTime } from 'luxon'

export interface Frontmatter {
  title: string
  date: string
  lang: string
  link?: string
  draft?: boolean
}

export interface Post extends Frontmatter {
  Content: AstroComponentFactory
  dateTime: DateTime
  html: string
  isOld: boolean
  slug: string
}

export interface MarkdownPost extends MarkdownInstance<Frontmatter> {
  default: () => Promise<MarkdownParserResponse>
}

export async function fetchPosts(posts: Promise<MarkdownPost[]>): Promise<Post[]> {
  return (await Promise.all((await posts)
    .map<Promise<Post>>(async (post) => {
      const { Content, default: load, file, frontmatter } = post
      const { html } = (await load()).metadata
      const dateTime = DateTime.fromISO(frontmatter.date, { setZone: true })
      const isOld = DateTime.now().diff(dateTime, 'years').toObject().years >= 10
      const slug = file.split('/').pop().split('.').shift().slice('YYYY-MM-DD-'.length)

      return { ...frontmatter, Content, dateTime, html, isOld, slug }
    })))
    .filter(({ draft }) => !draft)
    .sort((a, b) => b.dateTime.valueOf() - a.dateTime.valueOf())
}
