import { html } from '@rbardini/html'
import { Route } from '../constants.ts'
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
    <ul>
      <li><time datetime="${post.date.toISOString()}" id="${post.id}-date">${new Date(post.date).toLocaleDateString('en-us', dateFormat)}</time></li>
      ${
        post.tags.length > 1 &&
        html`<li>${post.tags
          .slice(1)
          .map((tag) => html`<a href="${Route.Tags + tag}/" rel="tag">#${tag}</a>`)
          .join(' ')}</li>`
      }
    </ul>
    <h1>
      <a href="${post.link ?? `/${post.slug}`}/" rel="${post.link ? 'external' : 'bookmark'}" id="${post.id}-title">${post.title}</a>
    </h1>
    ${post.excerpt && html`<p>${post.excerpt}</p>`}
  </header>`
}
