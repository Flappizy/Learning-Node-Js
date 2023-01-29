import { createWriteStream } from 'fs';
import { createServer } from 'http';
import { basename, join } from 'path';

const server = createServer((request, response) => {
    const filename = basename(request.headers['x-filename']);
    const destFilename = join('received_files', filename);
    console.log(`File request received: ${filename}`)
    request
      .pipe(createWriteStream(destFilename))
      .on('finish', () => {
        response.writeHead(201, { 'Content-Type': 'text/plain' })
        response.end('OK\n')
        console.log(`File saved: ${destFilename}`)
      })
});

server.listen(3000, () => console.log('Listening on http://localhost:3000'));