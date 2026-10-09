import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { Path } from './constants.ts'
import type { Context } from './types.ts'
import { getPosts } from './utils/posts.ts'
import { getRoutes } from './utils/routes.ts'

try {
  await rm(Path.Dist, { recursive: true })
} catch (err) {
  if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
} finally {
  await cp(Path.Static, Path.Dist, { recursive: true })
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
      await mkdir(dirname(file), { recursive: true })
      return writeFile(file, ctx.encoder.encode(result))
    })
  }),
)
