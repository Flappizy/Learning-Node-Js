import { resolve } from 'path';

export function createFSAdapter(db) {
    return {
        readFile(fileName, options, callBack) {
            if (typeof options === 'function') {
                callBack = options;
                options = {};
            }
            else if(typeof options === 'string') {
                options = { encoding: options };
            }
            db.get(resolve(fileName), { valueEncoding: options.encoding }, (err, value) => {
                if (err) {
                    if (err.type === 'NotFoundError') { 
                        err = new Error(`ENOENT, open "${fileName}"`)
                        err.code = 'ENOENT'
                        err.errno = 34
                        err.path = filename
                    }
                    return callBack && callBack(err)   
                }
                callBack && callBack(null, value);
            });
        },
        writeFile(fileName, content, options, callBack) {
            if (typeof options === 'function') {
                callBack = options;
                options = {};
            }
            else if(typeof options === 'string') {
                options = { encoding: options };
            }
            db.put(resolve(fileName), content, { valueEncoding: options.encoding }, callBack);
        }
    }
}