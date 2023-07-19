import { extract } from "$std/front_matter/yaml.ts"
import { join } from "$std/path/mod.ts"

export type Frontmatter = {
  title: string
}

export type Page = Frontmatter & {
  markdown: string
}

const pagesPath = "./pages"

export function getPageFiles(): AsyncIterable<Deno.DirEntry> {
  return Deno.readDir(pagesPath)
}

export async function getPage(filename: string): Promise<Page> {
  const text = await Deno.readTextFile(join(pagesPath, filename))
  const { attrs, body } = extract<Frontmatter>(text)

  return {
    ...attrs,
    markdown: body,
  }
}
