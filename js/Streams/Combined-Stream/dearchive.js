import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createDecryptAndDecompress } from './combined-streams.js';

const [,, password, source, iv] = process.argv;
const destination = `${source}.txt`;

pipeline(
    createReadStream(source),
    createDecryptAndDecompress(password, iv),
    createWriteStream(destination),
    (err) => {
        if(err) {
            console.log(err);
            process.exit(1);
        }
    }
);