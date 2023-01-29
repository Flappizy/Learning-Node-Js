import { readFile } from 'fs';

export function readJson(fileName, cb) {
    readFile(fileName, (err, data) => {
        let parsed;
        if(err) {
           return cb(err);
        }

        try{
            parsed = JSON.parse(data);
        } catch(err) {
            return cb(err);
        }

        return cb(null, parsed);

    });
}