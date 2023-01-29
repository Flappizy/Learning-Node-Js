import { createDecipheriv, randomBytes } from 'crypto';
import { createWriteStream } from 'fs';
import { createServer } from 'http';
import { basename, join } from 'path';
import { createGunzip } from 'zlib';

const secret = randomBytes(24);
console.log(`Generated secret: ${secret.toString('hex')}`);

const server = createServer((req, res) => {
    const fileName = basename(req.headers['x-filename']);
    const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex');
    const destFileName = join('received_files', fileName);
    console.log(destFileName);

    req
        .pipe(createDecipheriv('aes192', secret, iv))
        .pipe(createGunzip())
        .pipe(createWriteStream(destFileName))
        .on('finish', () => {
            res.writeHead(201, {'Content-Type': 'text/plain'});
            res('OK\n');
            console.log(`File saved: ${destFileName}`);
        });
});

server.listen(3000, () => console.log('Listening on http://localhost:3000'));