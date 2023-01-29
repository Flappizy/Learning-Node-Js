import { createWriteStream } from 'fs';
import net from 'net';

const server = net.createServer((socket) => {
    const writeStreamsMap = new Map();
    socket.on('close', () =>{
        process.nextTick(() => {
            writeStreamsMap.forEach((stream, fileName) => stream.end());
            writeStreamsMap = new Map();
        });
    })
    .on('data', (chunk) => {
        const fileLength = chunk.readUint8();
        const fileName = chunk.slice(1, fileLength + 1).toString();
        if(!fileName) return;

        const data = chunk.slice(fileLength + 1);
        let writeStream = writeStreamsMap.get(fileName);
        if(!writeStream) {
            writeStream = createWriteStream(`uploaded/${fileName}`).on('close', () => {
                console.log("Saved file: " + fileName);
            });
            writeStreamsMap.set(fileName, writeStream);
        }
        writeStream.write(data);
    })
    .on('error', (err) => {
        console.log(err);
    });
})
.listen(3000, () => {
    console.log("Server is started");
});