import { micromark } from '$micromark'
import { gfm, gfmHtml } from '$micromark-extension-gfm'
import { extractYaml } from '@std/front-matter'
import { Frontmatter } from '../types.ts'
import { parseHTML } from './html.ts'

export function renderMarkdown(markdown: string) {
  return micromark(markdown, {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
}

export function extractTitle(markdown: string) {
  const html = renderMarkdown(markdown)
  const doc = parseHTML(html)

  const title = doc.textContent
  const link = doc.querySelector('a')?.getAttribute('href') ?? undefined

  return { title, link }
}

export function extractExcerpt(markdown: string) {
  const html = renderMarkdown(markdown)
  const doc = parseHTML(html)

  return doc.textContent || undefined
}

export function extractTags(markdown: string) {
  const html = renderMarkdown(markdown)
  const doc = parseHTML(html)

  return Array.from(doc.querySelectorAll('code')).map((el) => el.textContent)
}

export function extractContent(text: string) {
  const { attrs, body } = extractYaml<Frontmatter>(text)

  const [firstLine, secondLine, thirdLine, ...restLines] = body.split('\n')
  const [lastLine] = restLines.splice(-2)
  const date = new Date(firstLine)
  const title = extractTitle(secondLine)
  const excerpt = extractExcerpt(thirdLine)
  const markdown = restLines.join('\n')
  const tags = extractTags(lastLine)

  return { ...attrs, date, ...title, excerpt, markdown, tags }
}
