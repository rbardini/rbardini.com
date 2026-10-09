import { readdir } from 'node:fs/promises'
import { extname, join, parse, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { Path } from '../constants.ts'
import type { Context, Route, RouteContext } from '../types.ts'

type RouteEntry = { name: string; path: string; isDynamic: boolean }

async function* getRouteEntries(root: string = Path.Routes): AsyncGenerator<RouteEntry> {
  const entries = await readdir(root, { withFileTypes: true })

  for (const entry of entries) {
    const path = resolve(root, entry.name)
    if (entry.isDirectory()) {
      yield* getRouteEntries(path)
    } else if (entry.isFile() && extname(entry.name) === '.ts') {
      const { dir, name } = parse(relative(Path.Routes, path))
      yield {
        name: join(dir, name),
        path,
        isDynamic: name.startsWith('[') && name.endsWith(']'),
      }
    }
  }
}

export async function getRoutes() {
  const routes: Route[] = []

  for await (const { name, path, isDynamic } of getRouteEntries()) {
    const { default: mod } = await import(pathToFileURL(path).href)
    const handler = (ctx: Context) => {
      const routeCtx: RouteContext = { ...ctx, name }
      return isDynamic ? mod(routeCtx) : [name, mod(routeCtx)]
    }

    routes.push({ name, handler, isDynamic })
  }

  return routes
}
