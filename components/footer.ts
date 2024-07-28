import { Route, site } from '../constants.ts'
import { html } from '../utils/html.ts'

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
  </footer>`
}
