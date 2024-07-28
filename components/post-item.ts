import { Post } from '../types.ts'
import { html } from '../utils/html.ts'

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
      <time datetime="${post.date.toISOString()}" style="width:${dateString.length + 1}ch">${dateString}</time>
      <a href="/${post.slug}">${post.title}</a>
    </span>
  </li>`
}
