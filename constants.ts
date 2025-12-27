export const site = {
  name: 'rbardini.com',
  description: "Rafael Bardini's blog",
  url: 'https://rbardini.com',
  author: 'Rafael Bardini',
  license: 'CC BY-NC-SA 4.0',
  feed: 'https://rbardini.com/rss.xml',
  repository: 'https://github.com/rbardini/rbardini.com',
  profiles: ['https://fosstodon.org/@rbardini'],
}

export enum Path {
  Routes = './routes',
  Static = './static',
  Dist = './dist',
}

export enum Route {
  Home = '/',
  Archive = '/archive/',
  Resume = '/resume/',
  RSS = '/rss.xml',
  Sitemap = '/sitemap.xml',
}
