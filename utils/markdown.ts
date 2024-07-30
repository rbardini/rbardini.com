import { micromark } from '$micromark'
import { gfm, gfmHtml } from '$micromark-extension-gfm'
import { DOMParser } from '@b-fuze/deno-dom'
import { extractYaml } from '@std/front-matter'
import { Frontmatter } from '../types.ts'

export function renderMarkdown(markdown: string) {
  return micromark(markdown, {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
}

export function extractTitle(markdown: string) {
  const html = renderMarkdown(markdown)
  const doc = new DOMParser().parseFromString(html, 'text/html')

  const title = doc.textContent
  const link = doc.querySelector('a')?.getAttribute('href') ?? undefined

  return { title, link }
}

export function extractContent(text: string) {
  const { attrs, body } = extractYaml<Frontmatter>(text)

  const [firstLine, _, ...restLines] = body.split('\n')
  const title = extractTitle(firstLine)
  const markdown = restLines.join('\n')

  return { ...attrs, ...title, markdown }
}
