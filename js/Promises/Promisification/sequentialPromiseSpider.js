import { promises as fsPromises } from 'fs';
import mkdirp from 'mkdirp';
import { dirname } from 'path';
import superagent from 'superagent';
import { promisify } from 'util';
import { getPageLinks, urlToFilename } from '../../WebSpider/utils.js';

const mkdirpPromises = promisify(mkdirp);

function download (url, fileName) {
    console.log(`Downloading ${url}`)
    let content
    superagent.get(url)
        .then(res => {
            content = res.text;
            return mkdirpPromises(dirname(fileName));
        })
        .then(() => {
            fsPromises.writeFile(fileName, content);
        })
        .then(() => {
            console.log(`Downloaded and saved: ${url}`);
            return content;
        })
}

function spiderLinks (currentUrl, content, nesting) {
    let promise = Promise.resolve() // (1)
    if (nesting === 0) {
        return promise
    }
    const links = getPageLinks(currentUrl, content)
    for (const link of links) {
        promise = promise.then(() => spider(link, nesting - 1)) // (2)
    }
    return promise
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

spider(url, nesting)
    .then(() => console.log('Download complete'))
    .catch(err => console.error(err)); //The catch() handler here will intercept any error originating from the
                                        //entire spider() process