import { html } from '@rbardini/html'
import type { Post } from '../types.ts'

export type PostHeaderProps = {
  post: Post
  dateFormat?: Intl.DateTimeFormatOptions
  headingLevel?: 1 | 2 | 3
}

const defaultDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export function postHeader({ post, dateFormat = defaultDateFormat, headingLevel = 1 }: PostHeaderProps) {
  return html`<header>
    <time datetime="${post.date.toISOString()}">${new Date(post.date).toLocaleDateString('en-us', dateFormat)}</time>
    <h${headingLevel}>
      <a href="${post.link ?? `/${post.slug}`}/" rel="${post.link ? 'external' : 'bookmark'}">${post.title}</a>
    </h${headingLevel}>
    ${post.excerpt && html`<p>${post.excerpt}</p>`}
  </header>`
}
