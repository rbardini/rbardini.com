import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  compressHTML: true,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'vitesse-dark' },
  },
  site: pkg.homepage,
})
