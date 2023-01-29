import { promises as fsPromises } from 'fs';
import mkdirp from 'mkdirp';
import { dirname } from 'path';
import superagent from 'superagent';
import { promisify } from 'util';
import { getPageLinks, urlToFilename } from '../../WebSpider/utils.js';

const mkdirpPromises = promisify(mkdirp);

async function download (url, fileName) {
    console.log(`Downloading ${url}`);
    const { text: content } = await superagent.get(url);
    await mkdirpPromises(dirname(fileName));
    await fsPromises.writeFile(fileName, content);
    console.log(`Downloaded and saved: ${url}`);
    return content;
}

async function spiderLinks (currentUrl, content, nesting) {
    if (nesting === 0) {
        return 
    }
    const links = getPageLinks(currentUrl, content);
    for (const link of links) {
        await spider(link, nesting - 1);
    }
}

async function spider (url, nesting) {
    const filename = urlToFilename(url);
    let content;
    try {
        content = await fsPromises.readFile(filename, 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err
        }
        // The file doesn't exist, so let's download it
         content = await download(url, filename)
    }
    
    return spiderLinks(url, content, nesting)
}

spider(url, nesting)
    .then(() => console.log('Download complete'))
    .catch(err => console.error(err)); //The catch() handler here will intercept any error originating from the
                                        //entire spider() process