import fs from 'fs';

export function listNestedFiles (dirName, cb) {
    getsubDirectories(dirName, cb);
    cb();    
}

function getsubDirectories (dirName, cb) {
    fs.readdir(dirName, 'utf8', (err, files) => {
        if (err) {
            return cb(err);
        }

        return files.map(file => file)
            .map(file => checkIfDirectory(file,cb))
    });
}

function checkIfDirectory(file,cb){
    return fs.stat(file, (err, stat) => {
        if(err)
            return cb(err)
        return stat.isDirectory() == true ? getsubDirectories(file,cb) : console.log(file)
    })
}