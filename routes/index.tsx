import { RouteContext } from "$fresh/server.ts"

import { Footer } from "/components/Footer.tsx"
import { Head } from "/components/Head.tsx"
import { PostHeader } from "/components/PostHeader.tsx"
import { PostItem } from "/components/PostItem.tsx"
import { getPosts } from "/utils/posts.ts"

const postItemDateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  year: "numeric",
}

export default async function Home(req: Request, ctx: RouteContext) {
  const [firstPost, ...restPosts] = await getPosts(5)

  return (
    <>
      <Head>
        <title>rbardini.com</title>
      </Head>
      <main>
        <article>
          <header>
            <h1>Hi, I'm Rafael Bardini 👋</h1>
          </header>
          <p>
            I'm a web developer currently living in the Amsterdam area.
          </p>
          <p>
            I work at <a href="https://www.redditinc.com/">Reddit</a>{" "}
            as a Senior Frontend Engineer, helping empower redditors and build
            the future of online communities.
          </p>
          <p>
            I designed and built{" "}
            <a href="https://carteiro.app/">Carteiro</a>, once a popular and
            highly-rated package tracking app, as well as several other{" "}
            <a href="https://github.com/rbardini">open-source projects</a>.
          </p>
        </article>
        <article>
          <h1>Recent posts</h1>
          <PostHeader post={firstPost} />
          <ul>
            {restPosts.map((post) => (
              <PostItem
                post={post}
                dateFormat={postItemDateFormat}
              />
            ))}
          </ul>
          <aside>
            <a href="/archive">All posts →</a>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  )
}
