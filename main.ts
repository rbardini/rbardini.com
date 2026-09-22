import { copy } from '@std/fs'
import { dirname, extname, join } from '@std/path'
import { Path } from './constants.ts'
import type { Context } from './types.ts'
import { getPosts } from './utils/posts.ts'
import { getRoutes } from './utils/routes.ts'

try {
  await Deno.remove(Path.Dist, { recursive: true })
} catch (err) {
  if (!(err instanceof Deno.errors.NotFound)) throw err
} finally {
  await copy(Path.Static, Path.Dist)
}

const ctx: Context = {
  encoder: new TextEncoder(),
  posts: await getPosts(),
  routes: await getRoutes(),
}

await Promise.all(
  ctx.routes.flatMap(({ handler, isDynamic }) => {
    const results = isDynamic ? handler(ctx) : [handler(ctx)]
    return results.map(async ([slug, result]) => {
      const isDir = !extname(slug)
      const file = join(Path.Dist, slug, isDir ? 'index.html' : '')
      await Deno.mkdir(dirname(file), { recursive: true })
      return Deno.writeFile(file, ctx.encoder.encode(result))
    })
  }),
)
