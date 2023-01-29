import Chance from 'chance';
import { createServer } from 'http';

const chance = new Chance();
const server = createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    while(chance.bool({ likelihood: 95 })) {
        res.write(`${chance.string()}\n`);
    }
    res.end('\n\n');//writable.end method signifies no more data will be written to the stream
    res.on('finish', () => console.log('Data has all been sent'));
});
server.listen(8080, () => {
    console.log('listening on http://localhost:8080')
});