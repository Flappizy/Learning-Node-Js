import { fork } from 'child_process';
import { connect } from 'net';

function multiplexChannels(sources, destination) {
    let openChannels = sources.length;

    for (let index = 0; index < sources.length; index++) {
        sources[index]
            .on('readable', function() {
                let chunk;
                while((chunk = this.read()) !== null) {
                    const outBuff = Buffer.alloc(1 + 4 + chunk.length);//Sets the size of the buffer
                    //Writes a 8 bit integer which represents the id to identify
                    //which source/channel the chunk belong to in the first position of the buffer
                    outBuff.writeUInt8(index, 0);
                    //Writes a 32 bit integer in the second position on the buffer
                    //The 32 bit ineger represents the size of the chunk
                    outBuff.writeUInt32BE(chunk.length, 1);
                    //Copies the chunk to the buffer skipping the first four bytes and starting at the fift byte
                    chunk.copy(outBuff, 5);
                    console.log(`Sending packet to channel: ${index}`);
                    destination.write(outBuff);
                }
            })
            .on('end', () => {
                if(--openChannels === 0)
                    destination.end();
            });
    }
}

const socket = connect(3000, () => { 
    const child = fork(
        process.argv[2],
        process.argv.slice(3),
        { silent: true }
    );
    multiplexChannels([child.stdout, child.stderr], socket);
})