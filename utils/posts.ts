import { extractYaml } from '@std/front-matter'
import { join } from '@std/path'
import { Frontmatter, Post } from '../types.ts'

const TEN_YEARS_IN_MILLIS = 86400000 * 365 * 10
const POSTS_SRC = './posts'

export async function getPosts(limit = Infinity) {
  const postEntries = Deno.readDir(POSTS_SRC)
  const posts: Post[] = []

  for await (const postEntry of postEntries) {
    const { name } = postEntry
    const slug = name.split('.').shift()!

    const text = await Deno.readTextFile(join(POSTS_SRC, name))
    const { attrs, body: markdown } = extractYaml<Frontmatter>(text)

    const date = new Date(attrs.date)
    const isOld = Date.now() - date.getTime() > TEN_YEARS_IN_MILLIS

    posts.push({ ...attrs, date, isOld, markdown, slug })
  }

  return posts.sort((a, b) => b.date.valueOf() - a.date.valueOf()).slice(0, limit)
}
