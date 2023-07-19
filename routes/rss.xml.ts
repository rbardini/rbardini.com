import { Feed } from "$feed"
import { Handlers } from "$fresh/server.ts"

import { render } from "/utils/markdown.ts"
import { getPosts } from "/utils/posts.ts"

export const handler: Handlers = {
  async GET() {
    const posts = await getPosts(20)
    const feed = new Feed({
      id: "https://rbardini.com",
      title: "rbardini.com",
      description: "Rafael Bardini's blog",
      author: { name: "Rafael Bardini" },
      copyright: "CC BY-NC-SA 4.0",
    })

    posts.forEach((post) =>
      feed.addItem({
        title: [post.title, post.link && "→"].filter(Boolean).join(" "),
        description: [
          render(post.markdown),
          post.link &&
          `<p><a href="${new URL(
            post.slug,
            "https://rbardini.com",
          )}" rel="bookmark">∞ Permalink</a></p>`,
        ].filter(Boolean).join("\n"),
        link: post.link ?? post.slug,
        date: post.date,
      })
    )

    return new Response(feed.rss2(), {
      headers: { "Content-Type": "application/rss+xml" },
    })
  },
}
