import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
      experimentalThemes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
  },
  site: pkg.homepage,
})
