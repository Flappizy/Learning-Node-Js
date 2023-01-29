import { TaskQueue } from './QueuesToTheRescue/QueueLimitingConcurrency.js';
import { spider } from "./spiderV4.js";

const url = process.argv[2];
const nesting = Number.parseInt(process.argv[3], 10) || 1;
const concurrency = Number.parseInt(process.argv[4], 10) || 2;

const spiderQueue = new TaskQueue(concurrency);
spiderQueue.on('error', console.error);
spiderQueue.on('empty', () => console.log('Download complete'));

spider(url, nesting, spiderQueue);

/*
spider(process.argv[2], (err, fileName, downloaded) => {
    if (err) {
        console.log(err);
    } else if (downloaded) {
        console.log(`Completed the download of "${fileName}"`);
    } else {
        console.log(`"${fileName}" was already downloaded`);
    }
});*/

/*
const url = process.argv[2];
const nesting = Number.parseInt(process.argv[3], 10) || 1;
spiderV3(url, nesting, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Download complete');
})*/