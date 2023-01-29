import { randomBytes } from 'crypto';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createCompressAndEncrypt } from './combined-streams.js';

const [,, password, source] = process.argv;
const iv = randomBytes(16);
const destination = `${source}.gz.enc`;

pipeline(
    createReadStream(source),
    createCompressAndEncrypt(password, iv),
    createWriteStream(destination),
    (err) => {
        if(err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`${destination} created with iv: ${iv.toString('hex')}`)
    }
);