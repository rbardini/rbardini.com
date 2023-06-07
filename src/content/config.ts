import type { MarkdownInstance } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { defineCollection, getCollection, z } from 'astro:content'
import { DateTime } from 'luxon'

export type Post = CollectionEntry<'posts'> & {
  dateTime: DateTime
  isOld: boolean
}

export type Frontmatter = Post['data']
export type PostMarkdownInstance = MarkdownInstance<Frontmatter>
export type PostRSS = PostMarkdownInstance & { slug: string }

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().datetime({ offset: true }),
    lang: z.string(),
    link: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().optional(),
  }),
})

export async function getPosts(): Promise<Post[]> {
  return (await getCollection('posts', ({ data }) => !data.draft))
    .map<Post>(post => {
      const dateTime = DateTime.fromISO(post.data.date, { setZone: true })
      const isOld = DateTime.now().diff(dateTime, 'years').toObject().years! >= 10

      return { ...post, dateTime, isOld }
    })
    .sort((a, b) => b.dateTime.valueOf() - a.dateTime.valueOf())
}

export function getPostsForRSS(): PostRSS[] {
  return Object.entries<PostMarkdownInstance>(import.meta.glob('./posts/*.md', { eager: true }))
    .filter(([, post]) => !post.frontmatter.draft)
    .map<PostRSS>(([filename, post]) => ({ ...post, slug: filename.split('/').pop()!.split('.').shift()! }))
    .sort((a, b) => new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf())
}

export const collections = { posts }
