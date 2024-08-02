import { micromark } from '$micromark'
import { gfm, gfmHtml } from '$micromark-extension-gfm'
import type { Content } from '../types.ts'
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

export function extractContent(text: string): Content {
  const [dateLine, titleLine, excerptLine, ...bodyLines] = text.split('\n')
  const [tagsLine] = bodyLines.splice(-2)
  const date = new Date(dateLine)
  const title = extractTitle(titleLine)
  const excerpt = extractExcerpt(excerptLine)
  const markdown = bodyLines.join('\n')
  const tags = extractTags(tagsLine)

  return { date, ...title, excerpt, markdown, tags }
}
