import { parse, resolve } from '@std/path'
import { Path } from '../constants.ts'
import type { Context, Route, RouteContext } from '../types.ts'

export async function getRoutes() {
  const routeEntries = Deno.readDir(Path.Routes)
  const routes: Route[] = []

  for await (const routeEntry of routeEntries) {
    const { base, ext, name } = parse(routeEntry.name)
    if (ext !== '.ts') continue

    const { default: mod } = await import(resolve(Path.Routes, base))
    const isDynamic = name.startsWith('[') && name.endsWith(']')
    const handler = (ctx: Context) => {
      const routeCtx: RouteContext = { ...ctx, name }
      return isDynamic ? mod(routeCtx) : [name, mod(routeCtx)]
    }

    routes.push({ name, handler, isDynamic })
  }

  return routes
}
