const RSS = require('rss')

module.exports = function plugin (opts) {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata()
    const collection = metadata.collections[opts.collection]
    const destination = opts.destination || 'rss.xml'
    const limit = opts.limit || 20

    const feed = new RSS({
      title: metadata.site.title,
      author: metadata.site.author,
      description: metadata.site.description,
      site_url: metadata.site.url,
      feed_url: new URL(destination, metadata.site.url)
    })

    collection.slice(0, limit).forEach(file => {
      let title = file.title
      let description = file.contents
      const url = new URL(file.path, metadata.site.url)

      if (file.link != null) {
        title = `→ ${title}`
        description = `${description}<p><a href="${url}" rel="bookmark">∞ Permalink</a></p>`
      }

      feed.item({
        title: title,
        date: file.date,
        description: description,
        url: file.link || url.href
      })
    })

    files[destination] = {
      contents: Buffer.from(feed.xml(), 'utf8')
    }

    done()
  }
}
