import { createWriteStream } from 'fs';
import { createServer } from 'net';

function demultiplexChannel(source, destinations) {
    let currentChannel = null;
    let channelLenght = null;
    source
        .on('readable', () => {
            let chunk;
            if (currentChannel === null) {
                chunk = source.read(1);
                currentChannel = chunk && chunk.readUInt8(0);
            }

            if(channelLenght === null) {
                chunk = source.read(4);
                channelLenght = chunk && chunk.readUInt32BE(0);

                if (!channelLenght) {
                    return null;
                }
            }

            chunk = source.read(channelLenght);
            if(chunk === null) {
                return null;
            }

            console.log(`Received packet from: ${currentChannel}`);
            destinations[currentChannel].write(chunk);
            currentChannel = null;
            channelLenght = null;
        })
        .on('end', () => {
            destinations.forEach(destination => {
                destination.end();
            });
            console.log('Source channel closed');
        })
}

const server = createServer((socket) => {
    const stdoutStream = createWriteStream('stdout.log');
    const stderrStream = createWriteStream('stderr.log');
    demultiplexChannel(socket, [stdoutStream, stderrStream])
});
    server.listen(3000, () => console.log('Server started'))