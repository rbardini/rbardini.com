export type Content = {
  date: Date
  title: string
  link?: string
  excerpt?: string
  markdown: string
  tags: string[]
}

export type Post = Content & {
  isOld: boolean
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
