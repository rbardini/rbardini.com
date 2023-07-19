import { RouteContext } from "$fresh/server.ts"

import { Footer } from "/components/Footer.tsx"
import { Head } from "/components/Head.tsx"
import { PostItem } from "/components/PostItem.tsx"
import { getPosts, Post as PostType } from "/utils/posts.ts"

export default async function Home(req: Request, ctx: RouteContext) {
  const posts = await getPosts()
  const postsByYear = posts.reduce<Record<number, PostType[]>>(
    (acc, post) => ((acc[post.date.getFullYear()] ??= []).push(post), acc),
    {},
  )

  return (
    <>
      <Head>
        <title>rbardini.com</title>
      </Head>
      <main>
        <article>
          <header>
            <h1>Archive</h1>
          </header>
          {Object.entries(postsByYear)
            .map(([year, posts]) => [+year, posts] as const)
            .sort(([yearA], [yearB]) => yearB - yearA)
            .map(([year, posts]) => (
              <section>
                <header>
                  <h2>{year}</h2>
                </header>
                <ul>
                  {posts.map((post) => <PostItem post={post} />)}
                </ul>
              </section>
            ))}
        </article>
      </main>
      <Footer />
    </>
  )
}
