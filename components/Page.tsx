import { render } from "/utils/markdown.ts"
import { Page as PageType } from "/utils/pages.ts"

export type PageProps = {
  page: PageType
}

export function Page({ page }: PageProps) {
  return (
    <article>
      <header>
        <h1>{page.title}</h1>
      </header>
      <div dangerouslySetInnerHTML={{ __html: render(page.markdown) }} />
    </article>
  )
}
