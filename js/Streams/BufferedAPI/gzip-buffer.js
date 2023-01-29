import { promises as fs } from 'fs';
import { promisify } from 'util';
import { gzip } from 'zlib';

const gzipPromise = promisify(gzip);
const fileName = process.argv[2];

async function main () {
    const fileData = await fs.readFile(fileName);
    const gzippedData = await gzipPromise(fileData);
    await fs.writeFile(`${fileName}.gz`, gzippedData)
    console.log('File successfully compressed');
}

main();