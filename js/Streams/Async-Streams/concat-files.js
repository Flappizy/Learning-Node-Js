import { createReadStream, createWriteStream } from 'fs';
import { Readable, Transform } from 'stream';

export function concatFiles(dest, files) {
    return new Promise((resolve, reject) => {
        const destStream = createWriteStream(dest);
        Readable.from(files)
            .pipe(new Transform({
                objectMode: true,
                transform (fileName, encoding, done) {
                    const src = createReadStream(fileName);
                    src.pipe(destStream, { end: false });
                    //return new Error("Fake Error");
                    src.on('error', done);
                    src.on('end', done);
                }
            }))
            .on('error', reject)
            .on('finish', () => {
                destStream.end();
                resolve();
            });
    });
}