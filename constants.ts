import pkg from './package.json' with { type: 'json' }

export const site = {
  name: pkg.name,
  description: pkg.description,
  url: pkg.homepage,
  author: pkg.author,
  license: pkg.license,
  feed: new URL('rss.xml', pkg.homepage).href,
  profiles: ['https://fosstodon.org/@rbardini'],
}

export const Path = {
  Routes: './routes',
  Static: './static',
  Dist: './dist',
} as const

export const Route = {
  Home: '/',
  Archive: '/archive/',
  Tags: '/tags/',
  Resume: '/resume/',
  RSS: '/rss.xml',
  Sitemap: '/sitemap.xml',
} as const
