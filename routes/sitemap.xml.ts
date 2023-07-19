import { Handlers } from "$fresh/server.ts"
import { html } from "$html/mod.ts"
import { basename, extname } from "$std/path/mod.ts"

import manifest from "/fresh.gen.ts"
import { getPostSlugs } from "/utils/posts.ts"

export const handler: Handlers = {
  async GET() {
    const postSlugs = await getPostSlugs()
    const pageRoutes = Object.keys(manifest.routes).reduce<string[]>(
      (acc, route) => {
        let filename = basename(route, extname(route))
        if (filename === "index") filename = "/"

        if (
          !filename.startsWith("[") && // Dynamic route
          !filename.startsWith("_") && // Error route
          !filename.includes(".") // Non-HTML (RSS, sitemap)
        ) acc.push(filename)

        return acc
      },
      [],
    )
    const locs = [...pageRoutes, ...postSlugs]

    const sitemap = html`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
      locs.map((loc) =>
        html`<url><loc>${new URL(loc, "https://rbardini.com")}</loc></url>`
      ).join("\n")
    }</urlset>`

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
    })
  },
}
