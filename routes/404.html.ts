import { document } from '../components/document.ts'
import { head } from '../components/head.ts'
import { html } from '../utils/html.ts'

export default function () {
  return document({
    head: head({ title: 'Page not found' }),
    body: html`<article>
      <h1>Page not found</h1>
      <div>
        <img src="/img/chimp.png" alt="Where's my banana?" />
      </div>
    </article>`,
  })
}
