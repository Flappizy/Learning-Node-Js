import { resolve } from 'path';

export function createInMemoryFSAdapter(tempStore) {
    return {
        readFile(fileName, options, callBack) {
            if (typeof options === 'function') {
                callBack = options;
                options = {};
            }
            else if(typeof options === 'string') {
                options = { encoding: options };
            }
            
            const content = tempStore.get(resolve(fileName));
            let err;
            if (!content) { 
                err = new Error(`ENOENT, open "${fileName}"`);
                err.code = 'ENOENT';
                err.errno = 34;
                err.path = fileName;
                return callBack && callBack(err)
            }
            callBack && callBack(null, content);
        },
        writeFile(fileName, content, options, callBack) {
            if (typeof options === 'function') {
                callBack = options;
                options = {};
            }
            else if(typeof options === 'string') {
                options = { encoding: options };
            }

            const oldContent = tempStore.get(resolve(fileName));
            if (!oldContent) {
                tempStore.set(resolve(fileName), oldContent + " " + content);    
            }
            else {
                tempStore(resolve(fileName), content);
            }
            callBack();
        }
    }
}