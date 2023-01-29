import fs, { link } from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import superagent from 'superagent';
import { getPageLinks, urlToFilename } from './utils.js';

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

function spiderLinks (url, body, nesting, cb) { 
    if (nesting === 0) { //Checks if the required nesting has been reached
        return process.nextTick(cb); //returns the callback
    }

    const links = getPageLinks(url, body); //get the links within the body of the particular URL
    if (links.length === 0) { //If there are no links within this page/body, return the callback
        return process.nextTick(cb);
    }

    function iterate (index) {
        if (index === link.length) { //Checks if we have gone through the links in the page/body
            return cb(); //Why are we not using process.nextTick() here
        } 

        spiderV2(getPageLinks[index], nesting - 1, err => { //Gets the body of a particular link
            if (err) {
                return cb(err);
            }
            iterate(index + 1); //
        });
    }

    iterate(0);
}


export function spiderV2 (url, nesting, cb) {
    const fileName = urlToFilename(url);
    fs.readFile(fileName, (err, fileContent) => {
        if (err) {
            if (err.code !== 'ENOENT') {
                return cb(err);
            }
            
            return download(url, fileName, (err, requestContent) => {
                if (err) {
                    return cb(err);
                }
                spiderLinks(url, requestContent, nesting, cb);
            });
        }

        spiderLinks(url, fileContent, nesting, cb);
        
    });
}  