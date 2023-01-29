import { readFile } from 'fs';

export function readJsonThrows(fileName, cb){
    readFile(fileName, 'utf-8', (err, data) => {
        if(err) {
            return cb(err);
        }
        cb(null, JSON.parse(data));
    });
}