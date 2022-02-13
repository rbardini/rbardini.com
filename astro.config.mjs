import pkg from './package.json' assert { type: 'json' }

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  buildOptions: {
    site: pkg.homepage,
    sitemap: true,
  },
})
