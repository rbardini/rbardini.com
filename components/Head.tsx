import { Head as FreshHead } from "$fresh/runtime.ts"
import { ComponentChildren } from "preact"

export type HeadProps = {
  children?: ComponentChildren
}

export function Head({ children }: HeadProps) {
  return (
    <FreshHead>
      <link
        rel="stylesheet"
        href="https://unpkg.com/lite-youtube-embed@0.2.0/src/lite-yt-embed.css"
      />
      <script
        src="https://unpkg.com/lite-youtube-embed@0.2.0/src/lite-yt-embed.js"
        async
      >
      </script>
      <script
        src="https://unpkg.com/prismjs@1.29.0/components/prism-core.min.js"
        defer
      >
      </script>
      <script
        src="https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"
        defer
      >
      </script>
      <link rel="stylesheet" href="/styles.css" />
      {children}
    </FreshHead>
  )
}
