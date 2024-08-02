import { html } from '@rbardini/html'
import { footer } from './footer.ts'

export type DocumentProps = {
  head: string
  body: string
}

export function document({ head, body }: DocumentProps) {
  return html`<!DOCTYPE html>
    <html>
      ${head}
      <body>
        <main>${body}</main>
        ${footer()}
      </body>
    </html>`
}
