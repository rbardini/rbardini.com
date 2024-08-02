import { html } from '@rbardini/html'
import { Route, site } from '../constants.ts'

export function footer() {
  return html`<footer>
    <nav>
      <ul>
        <li>
          <a href="${Route.Home}" rel="home">Home</a>
        </li>
        <li>
          <a href="${Route.Archive}">Archive</a>
        </li>
        <li>
          <a href="${Route.RSS}">RSS</a>
        </li>
        <li>
          <a href="${site.repository}">Source</a>
        </li>
      </ul>
    </nav>
    <p>With <span class="♥">♥</span> since 2007</p>
  </footer>`
}
