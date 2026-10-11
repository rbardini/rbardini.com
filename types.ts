export type Frontmatter = {
  date: Date
  lang: string
  tags?: string[]
}

export type Content = Required<Frontmatter> & {
  title: string
  link?: string
  excerpt?: string
  markdown: string
}

export type Post = Content & {
  id: string
  isOld: boolean
  slug: string
}

export type Context = {
  encoder: TextEncoder
  posts: Post[]
  routes: Route[]
}

export type RouteContext = Context & {
  name: string
}

export type StaticRouteHandlerResult = [slug: string, result: string]
export type DynamicRouteHandlerResult = StaticRouteHandlerResult[]
export type StaticRouteHandler = (ctx: Context) => StaticRouteHandlerResult
export type DynamicRouteHandler = (ctx: Context) => DynamicRouteHandlerResult
export type StaticRoute = { name: string; handler: StaticRouteHandler; isDynamic: false }
export type DynamicRoute = { name: string; handler: DynamicRouteHandler; isDynamic: true }
export type Route = StaticRoute | DynamicRoute
