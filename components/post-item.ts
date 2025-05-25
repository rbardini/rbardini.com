import { html } from '@rbardini/html'
import type { Post } from '../types.ts'

export type PostItemProps = {
  post: Post
  dateFormat?: Intl.DateTimeFormatOptions
}

const defaultDateFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: '2-digit',
}

export function postItem({ post, dateFormat = defaultDateFormat }: PostItemProps) {
  const dateString = post.date.toLocaleDateString('en-us', dateFormat)

  return html`<li>
    <span class="table">
      <time datetime="${post.date.toISOString()}" id="${post.id}-date" style="width:${dateString.length + 1}ch">${dateString}</time>
      <a href="/${post.slug}/" id="${post.id}-title">${post.title}</a>
    </span>
  </li>`
}
