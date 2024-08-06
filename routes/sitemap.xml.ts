import { html } from '@rbardini/html'
import { Route, site } from '../constants.ts'
import type { Context } from '../types.ts'

export default function ({ posts }: Context) {
  const locs = [
    ...Object.values(Route).filter((route) => !route.endsWith('.xml')),
    ...posts.map((post) => `/${post.slug}/`),
  ]

  return html`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locs.map((loc) => html`<url><loc>${new URL(loc, site.url)}</loc></url>`)}
    </urlset>`
}
