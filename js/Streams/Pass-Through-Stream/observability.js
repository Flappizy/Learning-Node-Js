import { PassThrough } from 'stream';

const monitor = new PassThrough();
let bytesWritten = 0;

monitor.on('data', chunk => {
    bytesWritten += chunk.length;
});

monitor.on('finish', () => {
    console.log(`${bytesWritten} bytes written`);
});

monitor.write('Hello');
monitor.end();
