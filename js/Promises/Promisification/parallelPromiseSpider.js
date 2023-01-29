import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import superagent from 'superagent'
import { getPageLinks, urlToFilename } from './utils.js'

function saveFile (filename, contents, cb) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return cb(err)
    }
    fs.writeFile(filename, contents, cb)
  })
}

function download (url, filename, cb) {
  console.log(`Downloading ${url}`)
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err)
    }
    saveFile(filename, res.text, err => {
      if (err) {
        return cb(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      cb(null, res.text)
    })
  })
}

function spiderLinks (currentUrl, body, nesting) {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = getPageLinks(currentUrl, body)
  const promises = links.map(link => spider(link, nesting - 1));

  return Promise.all(promises);
}

function spider (url, nesting) {
    const filename = urlToFilename(url);
    return fsPromises.readFile(filename, 'utf8')
        .catch((err) => {
            if (err.code !== 'ENOENT') {
                throw err
            }
            // The file doesn't exist, so let's download it
            return download(url, filename)
        })
        .then(content => spiderLinks(url, content, nesting))
}