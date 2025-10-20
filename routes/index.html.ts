import { html } from '@rbardini/html'
import { document } from '../components/document.ts'
import { head } from '../components/head.ts'
import { postHeader } from '../components/post-header.ts'
import { postItem } from '../components/post-item.ts'
import { Route, site } from '../constants.ts'
import resume from '../static/resume.json' with { type: 'json' }
import type { RouteContext } from '../types.ts'
import { renderMarkdown } from '../utils/markdown.ts'

const avatarSvg = await Deno.readTextFile('./static/avatar.svg')
const postItemDateFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
}

export default function ({ name, posts }: RouteContext) {
  const [firstPost, ...restPosts] = posts.slice(0, 5)
  return document({
    head: head({ name, title: site.name }),
    body: html`<article>
        <animated-avatar>${avatarSvg}</animated-avatar>
        <h1>Hi, I'm ${site.author}</h1>
        <div>
          ${renderMarkdown(resume.basics.summary)}
          <a class="cta" href="${Route.Resume}">More about me</a>
        </div>
      </article>
      <aside>
        <h2>Recent posts</h2>
        ${postHeader({ post: firstPost, headingLevel: 3 })}
        <ul>
          ${restPosts.map((post) => postItem({ post, dateFormat: postItemDateFormat }))}
        </ul>
        <a class="cta" href="${Route.Archive}">All posts</a>
      </aside>
      <script type="module" src="/js/animated-avatar.js" async></script>`,
  })
}
