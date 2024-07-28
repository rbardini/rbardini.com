import { Route, site } from '../constants.ts'
import { html } from '../utils/html.ts'

export type HeadProps = {
  title: string
}

export function head({ title }: HeadProps) {
  return html`<head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="author" content="${site.author}" />
    <meta name="viewport" content="width=device-width" />
    ${site.profiles.map((profile) => html`<link rel="me" href="${profile}" />`)}
    <link rel="alternate" href="${Route.RSS}" type="application/rss+xml" title="RSS" />
    <link rel="sitemap" href="${Route.Sitemap}" type="application/xml" title="Sitemap" />
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.3.2/src/lite-yt-embed.css" />
    <script src="https://unpkg.com/lite-youtube-embed@0.3.2/src/lite-yt-embed.js" async></script>
    <script src="https://unpkg.com/prismjs@1.29.0/components/prism-core.min.js" defer></script>
    <script src="https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js" defer></script>
  </head>`
}
