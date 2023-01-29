import fs from 'fs';


export function concatFiles (filePaths, dest, cb) {
    if (filePaths.length === 0) {
        return process.nextTick(cb);
    }

    function next (index) {        
        if (index === filePaths.length) {
            return cb();
        }

        const filePath = filePaths[index];
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return cb(err);
            }
            fs.appendFile(dest, data, err => {
                if (err) {
                    return cb(err);
                }

                next(index + 1);
            })

        });
    }

    next(0);
}