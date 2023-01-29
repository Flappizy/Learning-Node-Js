import { promises as fs } from 'fs';
import mkdirp from 'mkdirp';
import { dirname } from 'path';
import { Writable } from 'stream';
import { promisify } from 'util';

const mkdirpPromises = promisify(mkdirp);

//Simplified Construction
const tfs = new Writable({
    objectMode: true,
    write (chunk, encoding, cb) {
        mkdirpPromises(dirname(chunk.path))
            .then(() => fs.writeFile(chunk.path, chunk.content))
            .then(() => cb())
            .catch(cb);
    }
});

//Class construction
export class ToFileStream extends Writable {
    constructor (options) {
        super({...options, objectMode: true});
    }

    _write (chunk, encoding, cb) {
        mkdirpPromises(dirname(chunk.path))
            .then(() => fs.writeFile(chunk.path, chunk.content))
            .then(() => cb())
            .catch(cb)

    }
}