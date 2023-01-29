import { pipeline, Transform } from 'stream';
import { createGunzip, createGzip } from 'zlib';

const upperCasify = new Transform({
    transform (chunk, encoding, cb) {
        this.push(chunk.toString().toUpperCase());
        cb();
    }
});

pipeline(
    process.stdin,
    //This used for decompressing a file
    createGunzip(),
    upperCasify,
    //This is used to compress a file
    createGzip(),
    process.stdout,
    (err) => {
        if(err) {
            console.log(err);
            process.exit(1);
        }
    }
);