import { extract } from "$std/front_matter/yaml.ts"
import { join } from "$std/path/mod.ts"

export type Frontmatter = {
  title: string
  date: string
  lang: string
  link?: string
  draft?: boolean
}

export type Post = Omit<Frontmatter, "date"> & {
  date: Date
  isOld: boolean
  markdown: string
  slug: string
}

const postsPath = "./posts"

export function postFilenameToSlug(filename: string): string {
  return filename.split(".").shift()!
}

export function getPostFiles(): AsyncIterable<Deno.DirEntry> {
  return Deno.readDir(postsPath)
}

export async function getPostFilenames(): Promise<string[]> {
  const files = getPostFiles()
  const filenames: string[] = []

  for await (const file of files) filenames.push(file.name)

  return filenames
}

export async function getPostSlugs(): Promise<string[]> {
  const filenames = await getPostFilenames()
  return filenames.map(postFilenameToSlug)
}

export async function getPost(filename: string): Promise<Post> {
  const text = await Deno.readTextFile(join(postsPath, filename))
  const { attrs, body } = extract<Frontmatter>(text)
  const date = new Date(attrs.date)

  return {
    ...attrs,
    date,
    isOld: Date.now() - date.getTime() > 86400000 * 365 * 10,
    markdown: body,
    slug: postFilenameToSlug(filename),
  }
}

export async function getPosts(limit = Infinity): Promise<Post[]> {
  const filenames = await getPostFilenames()
  const posts = await Promise.all(filenames.map(getPost))

  return posts
    .sort((a, b) => b.date.valueOf() - a.date.valueOf())
    .slice(0, limit)
}
