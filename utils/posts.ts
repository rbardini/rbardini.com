import { join, parse } from '@std/path'
import { Post } from '../types.ts'
import { extractContent } from './markdown.ts'

const TEN_YEARS_IN_MILLIS = 86400000 * 365 * 10
const POSTS_SRC = './posts'

export async function getPosts(limit = Infinity) {
  const postEntries = Deno.readDir(POSTS_SRC)
  const posts: Post[] = []

  for await (const postEntry of postEntries) {
    const { name } = postEntry
    const slug = parse(name).name.slice('YYYY-MM-DD-'.length)

    const text = await Deno.readTextFile(join(POSTS_SRC, name))
    const content = extractContent(text)

    const date = new Date(content.date)
    const isOld = Date.now() - date.getTime() > TEN_YEARS_IN_MILLIS

    posts.push({ ...content, date, isOld, slug })
  }

  return posts.sort((a, b) => b.date.valueOf() - a.date.valueOf()).slice(0, limit)
}
