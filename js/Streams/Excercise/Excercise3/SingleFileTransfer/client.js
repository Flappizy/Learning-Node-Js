import { createReadStream } from 'fs';
import net from 'net';
import path from 'path';
import { pipeline } from 'stream';

const filePath = process.argv[2];
const fileName = path.basename(filePath);

const client = net.createConnection({
    port: 3000 },
    () => {
        console.log('Connection created');
});

client.on('connect', () => {
    client.write(fileName);//Writes the fileName to the socket
    pipeline(
        createReadStream(filePath),
        client,
        (err) => {
            if(err)
                console.log(err);
            client.end();
        }
    )
})
