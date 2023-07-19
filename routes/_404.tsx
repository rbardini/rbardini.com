import { PageProps } from "$fresh/server.ts"

import { Footer } from "/components/Footer.tsx"
import { Head } from "/components/Head.tsx"
import { Page } from "/components/Page.tsx"
import { Page as PageType } from "/utils/pages.ts"

const staticProps = {
  data: {
    title: "Page not found",
    markdown: `![Where's my banana?](/img/chimp.png)`,
  },
} as PageProps<PageType>

export default function NotFoundPage() {
  const page = staticProps.data

  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>
      <main>
        <Page page={page} />
      </main>
      <Footer />
    </>
  )
}
