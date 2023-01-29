import fs from 'fs';

const cache = new Map();

function inconsistentRead(filename, cb) {
    if(cache.has(filename)) {
        //return process.nextTick(() => cb(cache.get(filename)));
        return cb(cache.get(filename));
    }
    else {
        fs.readFile(filename, 'utf-8', (err, data) => {
            cache.set(filename, data);
            return cb(data);
        });
    }
}

export function createFileReader(fileName) {
    const listeners = [];

    inconsistentRead(fileName, value => {
        listeners.forEach(listener => listener(value));
    });

    return {
        onDataReady: listener => listeners.push(listener)
    }
}