//Pull process of reading from a stream
process.stdin
.setEncoding('utf-8')
    .on('readable', () => {
        let chunk;
        console.log('New data available');
        while ((chunk = process.stdin.read()) !== null) {
            console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
        }
    })
    .on('end', () => console.log('End of stream'));