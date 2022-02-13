import type { AstroComponentFactory } from 'astro/dist/types/runtime/server'
import { DateTime } from 'luxon'

export interface Frontmatter {
  title: string
  date: string
  lang: string
  link?: string
}

export interface Post extends Frontmatter {
  Content: AstroComponentFactory
  dateTime: DateTime
  isOld: boolean
  slug: string
}

export async function fetchPosts(): Promise<Post[]> {
  const files: Record<string, Function> = await import.meta.glob('./**/*.md')

  return (
    await Promise.all(
      Object.entries(files).map(async ([filename, importFile]) => {
        const { default: Content, frontmatter } = await importFile()
        const dateTime = DateTime.fromISO(frontmatter.date, { setZone: true })
        const isOld = DateTime.now().diff(dateTime, 'years').toObject().years >= 10
        const slug = filename.split('/').pop().split('.').shift().slice('YYYY-MM-DD-'.length)

        return { ...frontmatter, Content, dateTime, isOld, slug }
      }),
    )
  ).sort((a, b) => b.dateTime - a.dateTime)
}
