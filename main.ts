import { copy } from '@std/fs'
import { extname, join } from '@std/path'
import { Path } from './constants.ts'
import { Context } from './types.ts'
import { getPosts } from './utils/posts.ts'
import { getRoutes } from './utils/routes.ts'

try {
  await Deno.remove(Path.Dist, { recursive: true })
} finally {
  await copy(Path.Static, Path.Dist)
}

const ctx: Context = {
  encoder: new TextEncoder(),
  posts: await getPosts(),
  routes: await getRoutes(),
}

ctx.routes.forEach(({ handler, isDynamic }) => {
  const results = isDynamic ? handler(ctx) : [handler(ctx)]
  results.forEach(async ([slug, result]) => {
    const isDir = !extname(slug)
    if (isDir) await Deno.mkdir(join(Path.Dist, slug))
    Deno.writeFile(join(...[Path.Dist, slug, isDir ? 'index.html' : '']), ctx.encoder.encode(result))
  })
})
