import fs from 'fs';
import { relative, resolve } from 'path';
import { TaskQueue } from '../WebSpider/QueuesToTheRescue/QueueLimitingConcurrency.js';

let matchedTextFiles = [];
const __dirname = resolve();

export function recursiveFind(dir, keyword, queue) {        
    queue.pushTask(done => {
        getsubDirectories(dir, keyword, queue, done);
    });
}

function getsubDirectories (dirName, keyword, queue, cb) {
    fs.readdir(dirName, 'utf-8', (err, paths) => {
        if (err) {
            return cb(err);
        }

        paths.forEach(path => {
            queue.pushTask(doneWithPath => {
                const fullPath = resolve(dirName, path);
                checkIfDirectory(keyword, fullPath, queue, doneWithPath);
            });

        });

        return cb();
    });
}

function checkIfDirectory(keyword, file, queue, cb){
    fs.stat(file, (err, stat) => {
        
        if(err) return cb(err);
        
        const isFileADirectory = stat.isDirectory();

        if (!isFileADirectory) return addIfFileTextAndContainKeyword(keyword, file, cb);

        recursiveFind(file, keyword, queue);
        cb();
    });
}

function addIfFileTextAndContainKeyword (keyword, file, cb) {    

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) return cb(err);

        const fileContentIncludesKeyword = data.includes(keyword);
        matchedTextFiles.push(relative(__dirname, file));
        //if (fileContentIncludesKeyword)  matchedTextFiles.push(relative(__dirname, file));

        cb();
    });  
}

const queue = new TaskQueue(5);
queue.on('empty', () => console.log(matchedTextFiles));
queue.on('error', console.error);
recursiveFind('../WebSpider', 'football', queue);