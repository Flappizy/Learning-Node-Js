import { Readable } from 'stream';

const mountains = [
    { name: 'Everest', tallness: 8848 },
    { name: 'K2', tallness: 8611 },
    { name: 'Kangchenjunga', tallness: 8586 },
    { name: 'Lhotse', tallness: 8516 },
    { name: 'Makalu', tallness: 8481 }
]

//The Readable.from method takes other arguments that can be used to specify stream options like objectMode.
//Note that by default, Readable.from() will set objectMode to true, unless this 
//is explicitly opted out by setting it to false. Stream options can be 
//passed as a second argument to the function.
const mountainsStream = Readable.from(mountains);
mountainsStream.on('data', (mountain) => {
    console.log(`${mountain.name.padStart(14)}\t${mountain.tallness}m`)
});