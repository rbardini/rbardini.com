import { html } from '@rbardini/html'
import type { Post } from '../types.ts'

export type PostHeaderProps = {
  post: Post
  dateFormat?: Intl.DateTimeFormatOptions
}

const defaultDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export function postHeader({ post, dateFormat = defaultDateFormat }: PostHeaderProps) {
  return html`<header>
    <time datetime="${post.date.toISOString()}" id="${post.id}-date">${new Date(post.date).toLocaleDateString('en-us', dateFormat)}</time>
    <h1>
      <a href="${post.link ?? `/${post.slug}`}/" rel="${post.link ? 'external' : 'bookmark'}" id="${post.id}-title">${post.title}</a>
    </h1>
    ${post.excerpt && html`<p>${post.excerpt}</p>`}
  </header>`
}
