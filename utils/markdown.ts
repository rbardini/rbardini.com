import matter from 'gray-matter'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import type { Content, Frontmatter } from '../types.ts'
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

  const title = doc.documentElement?.textContent ?? ''
  const link = doc.querySelector('a')?.getAttribute('href') ?? undefined

  return { title, link }
}

export function extractExcerpt(markdown: string) {
  const html = renderMarkdown(markdown)
  const doc = parseHTML(html)

  return doc.documentElement?.textContent || undefined
}

export function extractContent(text: string): Content {
  const { data, content } = matter(text)
  const { date, lang, tags = [] } = data as Frontmatter
  const [, titleLine, excerptLine, ...bodyLines] = content.split('\n')
  const title = extractTitle(titleLine)
  const excerpt = extractExcerpt(excerptLine)
  const markdown = bodyLines.join('\n')

  return { date, lang, tags, ...title, excerpt, markdown }
}
