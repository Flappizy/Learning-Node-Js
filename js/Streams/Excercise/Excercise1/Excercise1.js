import { createReadStream } from 'fs';
import { hrtime } from 'process';
import { PassThrough, pipeline, Transform } from 'stream';
import { createBrotliCompress, createDeflate, createGzip } from 'zlib';

const filePath = process.argv[2];
const inputStream = createReadStream(filePath);
const algorithmList = [
    {
        name: "Gzip",
        method: createGzip
    },
    {
        name: "Brotli",
        method: createBrotliCompress
    },
    {
        name: "Deflate",
        method: createDeflate
    }
]

function algorithmCompressionTest(algorithm, algorithmName) {
    let startTime = 0;
    let bytesWritten = 0;
    const monitor = new PassThrough();  
    monitor.on('data', (chunk) => {
        bytesWritten += chunk.length;
    });
    monitor.on('finish', () => {
        console.log(`${algorithmName} compressed the file size to ${bytesWritten} bytes
            in ${hrtime.bigint() - startTime}`);
    });

    pipeline(
        inputStream, 
        new Transform({
        defaultEncoding: 'utf8',
        transform(chunk, encoding, cb) {
            startTime = hrtime.bigint();
            cb();
        },
        flush(cb) {
            cb();
        }}),
        algorithm(),
        monitor,
        (err) => {
            console.log(err);
        }
    );         
}

async function main() {
    for(const algorithm of algorithmList) {
        algorithmCompressionTest(algorithm.method, algorithm.name);
    }
}

main();
