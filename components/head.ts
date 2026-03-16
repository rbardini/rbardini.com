import { html } from '@rbardini/html'
import { Route, site } from '../constants.ts'

export type HeadProps = {
  name?: string
  title: string
  md?: boolean
}

export function head({ name, title, md }: HeadProps) {
  const url = name?.replaceAll('index.html', '.')

  return html`<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="author" content="${site.author}">
    <meta name="viewport" content="width=device-width">
    ${site.profiles.map((profile) => html`<link rel="me" href="${profile}">`)}
    ${url && html`<link rel="canonical" href="${new URL(url.concat('/'), site.url)}">`}
    ${url && md && html`<link rel="alternate" href="${new URL(url.concat('.md'), site.url)}" type="text/markdown" title="Markdown">`}
    <link rel="alternate" href="${new URL(Route.RSS, site.url)}" type="application/rss+xml" title="RSS">
    <link rel="sitemap" href="${new URL(Route.Sitemap, site.url)}" type="application/xml" title="Sitemap">
    <link rel="stylesheet" href="${new URL('/css/styles.css', site.url)}">
    <link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.3.2/src/lite-yt-embed.css">
    <script src="https://unpkg.com/lite-youtube-embed@0.3.2/src/lite-yt-embed.js" async></script>
    <script src="https://unpkg.com/prismjs@1.29.0/components/prism-core.min.js" defer></script>
    <script src="https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js" defer></script>
  </head>`
}
