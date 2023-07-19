import { RouteContext } from "$fresh/server.ts"

import { Footer } from "/components/Footer.tsx"
import { Head } from "/components/Head.tsx"
import { Post } from "/components/Post.tsx"
import { getPost } from "/utils/posts.ts"

export default async function PostPage(req: Request, ctx: RouteContext) {
  const post = await getPost(`${ctx.params.slug}.md`)
  if (!post) return ctx.renderNotFound()

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        <Post post={post} />
      </main>
      <Footer />
    </>
  )
}
