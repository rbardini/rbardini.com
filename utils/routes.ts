import { parse, resolve } from '@std/path'
import { Path } from '../constants.ts'
import type { Context, Route } from '../types.ts'

export async function getRoutes() {
  const routeEntries = Deno.readDir(Path.Routes)
  const routes: Route[] = []

  for await (const routeEntry of routeEntries) {
    const { base, ext, name } = parse(routeEntry.name)
    if (ext !== '.ts') continue

    const mod = await import(resolve(Path.Routes, base))
    const isDynamic = name.startsWith('[') && name.endsWith(']')
    const handler = (ctx: Context) => isDynamic ? mod.default(ctx) : [name, mod.default(ctx)]

    routes.push({ name, handler, isDynamic })
  }

  return routes
}
