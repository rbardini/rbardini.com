export type Frontmatter = {
  title: string
  date: string
  lang: string
  link?: string
  draft?: boolean
  excerpt?: string
}

export type Post = Omit<Frontmatter, 'date'> & {
  date: Date
  isOld: boolean
  markdown: string
  slug: string
}

export type Context = {
  encoder: TextEncoder
  posts: Post[]
  routes: Route[]
}

export type StaticRouteHandlerResult = [slug: string, result: string]
export type DynamicRouteHandlerResult = StaticRouteHandlerResult[]
export type StaticRouteHandler = (ctx: Context) => StaticRouteHandlerResult
export type DynamicRouteHandler = (ctx: Context) => DynamicRouteHandlerResult
export type StaticRoute = { name: string; handler: StaticRouteHandler; isDynamic: false }
export type DynamicRoute = { name: string; handler: DynamicRouteHandler; isDynamic: true }
export type Route = StaticRoute | DynamicRoute
