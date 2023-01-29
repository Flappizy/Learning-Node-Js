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
    const promises = links.map(link => spider(link, nesting -1) );

    //The below loop has a small undesired effect. If a
    //Promise in the links array rejects, we have to wait for all the preceding promises in the
    //array to resolve before the Promise returned by spiderLinks() will also reject. This is
    //not optimal in most situations, as we usually want to know if an operation has failed
    //as soon as possible
    /*
    for (const promise of promises) {
        await promise;
    }*/

    //This is a better implementation that returns immediately when a promise rejects in the links array
    return Promise.all(promises);
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