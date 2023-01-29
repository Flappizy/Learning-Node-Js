import { promises as fsPromises } from 'fs';
import { getPageLinks, urlToFilename } from '../../WebSpider/utils.js';
import { TaskQueuePC } from '../limitedConcurrencyPC';

async function download (url, fileName) {
    console.log(`Downloading ${url}`);
    const { text: content } = await superagent.get(url);
    await mkdirpPromises(dirname(fileName));
    await fsPromises.writeFile(fileName, content);
    console.log(`Downloaded and saved: ${url}`);
    return content;
}

function spiderLinks (currentUrl, content, nesting, queue) {
    if (nesting === 0) {
        return Promise.resolve();
    }
    const links = getPageLinks(currentUrl, content);
    const promises = links.map(link => spiderTask(link, nesting - 1, queue));
    return Promise.all(promises);
}

const spidering = new Set()
async function spiderTask (url, nesting, queue) {
    let content;
    if (spidering.has(url)) {
        return 
    }
    spidering.add(url);
    const filename = urlToFilename(url);
    try {
        content = await fsPromises.readFile(filename, 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err
        }
        // The file doesn't exists, so let's download it
        content = await download(url, filename)
    }

    return queue.runTask(spiderLinks(url, content, nesting));
}


export function spider (url, nesting, concurrency) {
    const queue = new TaskQueuePC(concurrency);
    return spiderTask(url, nesting, queue);
}