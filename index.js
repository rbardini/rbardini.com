const argv = require('yargs').argv
const Metalsmith = require('metalsmith')
const assets = require('metalsmith-assets-improved')
const ignore = require('metalsmith-ignore')
const renamer = require('metalsmith-renamer')
const archive = require('metalsmith-archive')
const collections = require('metalsmith-collections')
const metadata = require('metalsmith-collection-metadata')
const moveUp = require('metalsmith-move-up')
const metallic = require('metalsmith-metallic')
const markdown = require('metalsmith-markdownit')
const footnote = require('markdown-it-footnote')
const permalinks = require('metalsmith-permalinks')
const sitemap = require('metalsmith-sitemap')
const layouts = require('metalsmith-layouts')
const postcss = require('metalsmith-postcss')
const htmlMinifier = require('metalsmith-html-minifier')
const serve = require('metalsmith-serve')
const watch = require('metalsmith-watch')
const moment = require('metalsmith-moment')

const packageJson = require('./package.json')
const rss = require('./plugins/rss')

const highlightjsStyle = 'tomorrow-night-eighties.css'

Metalsmith(__dirname)
  .metadata({
    development: argv.development,
    site: {
      title: packageJson.name,
      author: packageJson.author,
      description: packageJson.description,
      url: packageJson.homepage,
      trackingId: 'UA-3034872-1',
      highlightjsStyle
    }
  })
  .use(assets({
    src: 'node_modules/lite-youtube-embed/src',
    dest: 'vendor'
  }))
  .use(assets({
    src: `node_modules/highlight.js/styles/${highlightjsStyle}`,
    dest: `vendor/${highlightjsStyle}`
  }))
  .use(assets({
    src: 'node_modules/turbolinks/dist',
    dest: 'vendor'
  }))
  .use(ignore('**/.*'))
  .use(renamer({
    posts: {
      pattern: 'posts/*.md',
      rename: name => name.substr(11)
    }
  }))
  .use(archive())
  .use(collections({
    pages: 'pages/*.md',
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(metadata({
    pages: { type: 'page' },
    posts: { type: 'post' }
  }))
  .use(moveUp([
    '**/*.md',
    'assets/**'
  ]))
  .use(metallic())
  .use(markdown({
    html: true,
    typographer: true
  }).use(footnote))
  .use(permalinks({
    relative: false
  }))
  .use(sitemap({
    hostname: packageJson.homepage,
    modifiedProperty: 'date',
    omitIndex: true
  }))
  .use(rss({ collection: 'posts' }))
  .use(moment(['date']))
  .use(layouts({
    pattern: '**/*.html',
    default: 'article.pug',
    moment: moment
  }))
  .use(postcss({
    plugins: {
      'postcss-color-mod-function': {},
      'postcss-preset-env': {},
      cssnano: { autoprefixer: false }
    },
    map: argv.development
  }))
  .use(renamer({
    css: {
      pattern: '**/*.css',
      rename: name => name.replace(/\.css$/, '.min.css')
    }
  }))
  .use(htmlMinifier())
  .use(argv.development && serve())
  .use(argv.development && watch({
    livereload: true
  }))
  .build(err => {
    if (err) throw err
  })
