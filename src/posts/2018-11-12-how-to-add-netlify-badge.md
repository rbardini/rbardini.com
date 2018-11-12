---
title: How to add a Netlify deploy status badge to your project
date: 2018-11-12 22:44:46 +1
lang: en-US
---

Ever since I moved this blog to [Netlify](https://www.netlify.com/) I wanted to add a badge to the [repository's README](https://github.com/rbardini/rbardini.github.io#readme) displaying the deploy status. The [Shields.io](https://shields.io/) service doesn't support Netlify badges yet, but luckily I found out that you can build dynamic badges by querying structured data from any public URL.

After digging into the [Netlify REST API](https://www.netlify.com/docs/api/), I managed to make a badge that fetches all deploys for my site and extracts the status of the last deploy:

`[![Deploy status](https://img.shields.io/badge/dynamic/json.svg?url=https://api.netlify.com/api/v1/sites/rbardini.com/deploys&label=deploy&query=$[0].state&colorB=blue)](https://app.netlify.com/sites/rbardini/deploys)`

Which looks like this:

[![Deploy status](https://img.shields.io/badge/dynamic/json.svg?url=https://api.netlify.com/api/v1/sites/rbardini.com/deploys&label=deploy&query=$[0].state&colorB=blue)](https://app.netlify.com/sites/rbardini/deploys)

One shortcoming is that you cannot set a different color depending on the status, that's why I'm using a "neutral" blue background here. Also, I assume deploy logs must be public for the link (and possibly the badge itself) to work.
