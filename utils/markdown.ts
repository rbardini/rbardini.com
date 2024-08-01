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

export function extractTags(markdown: string) {
  const html = renderMarkdown(markdown)
  const doc = new DOMParser().parseFromString(html, 'text/html')

  return Array.from(doc.querySelectorAll('code')).map((el) => el.textContent)
}

export function extractContent(text: string) {
  const { attrs, body } = extractYaml<Frontmatter>(text)

  const [firstLine, secondLine, ...restLines] = body.split('\n')
  const [lastLine] = restLines.splice(-2)
  const date = new Date(firstLine)
  const title = extractTitle(secondLine)
  const markdown = restLines.join('\n')
  const tags = extractTags(lastLine)

  return { ...attrs, date, ...title, markdown, tags }
}
