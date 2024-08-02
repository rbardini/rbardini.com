import { html } from '@rbardini/html'
import { Post } from '../types.ts'
import { renderMarkdown } from '../utils/markdown.ts'
import { postHeader } from './post-header.ts'

export type PostProps = {
  post: Post
}

export function post({ post }: PostProps) {
  return html`<article>
    ${postHeader({ post })}
    ${
    post.isOld &&
    html`<div class="disclaimer">
      <strong>Note:</strong> This is an old post.
      The opinions and views expressed here may not reflect the author's current thinking.
    </div>`
  }
    <div>${renderMarkdown(post.markdown)}</div>
  </article>`
}
