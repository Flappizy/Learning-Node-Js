import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import superagent from 'superagent';
import { urlToFilename } from './utils.js';

function saveFile (fileName, content, cb) {
    mkdirp(path.dirname(fileName), err => { // [3]
        if (err) {
          return cb(err);
        } 
        fs.writeFile(fileName, content, cb);
    });
}

function download (url, fileName, cb) {
    console.log(`Downloading ${url} into ${fileName}`);
    superagent.get(url).end((err, res) => { // [2]
        if (err) {
          return cb(err);
        } 
        saveFile(fileName, res.text, err => {
            if (err) {
                return cb(err);
            }
            console.log(`Downloaded and saved: ${url}`)
            return cb(null, res.text);
        });        
    });
}


export function spider (url, cb) {
    const fileName = urlToFilename(url);
    fs.access(fileName, err => {
        if (!err || err.code !== 'ENOENT') {
            return cb(null, fileName, false);
        }
        download(url, fileName, err => {
            if (err) {
                return cb(err);
            }
            cb(null, fileName, true);
        });
    });
}  