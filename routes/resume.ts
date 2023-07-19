import { Handlers } from "$fresh/server.ts"
import { render } from "$jsonresume-theme-even"

import resume from "/static/resume.json" assert { type: "json" }

export const handler: Handlers = {
  GET() {
    return new Response(render(resume), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  },
}
