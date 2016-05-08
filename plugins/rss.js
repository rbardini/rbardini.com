const RSS = require('rss')
const URL = require('url')

module.exports = function plugin (opts) {
  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()
    var collection = metadata.collections[opts.collection]
    var destination = opts.destination || 'rss.xml'
    var limit = opts.limit || 20

    var feed = new RSS({
      title: metadata.site.title,
      author: metadata.site.author,
      description: metadata.site.description,
      site_url: metadata.site.url,
      feed_url: URL.resolve(metadata.site.url, destination)
    })

    collection.slice(0, limit).forEach(file => {
      var title = file.title
      var description = file.contents
      var url = URL.resolve(metadata.site.url, file.path)

      if (file.link != null) {
        title = `→ ${title}`
        description = `${description}<p><a href="${url}" rel="bookmark">∞ Permalink</a></p>`
      }

      feed.item({
        title: title,
        date: file.date,
        description: description,
        url: file.link || url
      })
    })

    files[destination] = {
      contents: new Buffer(feed.xml(), 'utf8')
    }

    done()
  }
}
