//The below pattern is important to know if you need to write a function that
//consumes an entire Readable stream and returns a Promise, this could come in very handy
async function main() {
    for await (const chunk of process.stdin) {
        console.log('New data is available');
        console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
    }
    console.log('End of stream');
}

main();