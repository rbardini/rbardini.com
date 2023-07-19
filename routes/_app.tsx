import { PageProps } from "$fresh/server.ts"

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>rbardini.com</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  )
}
