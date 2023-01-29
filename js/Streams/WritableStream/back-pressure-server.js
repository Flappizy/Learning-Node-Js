import Chance from 'chance';
import { createServer } from 'http';

const chance = new Chance();
const server = createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    function generateMore() {
        while(chance.bool({ likelihood: 95 })) {
            const randomChunk = chance.string({length: (16 * 1024) - 1});
            const shouldContinue = res.write(`${randomChunk}\n`);
            if(!shouldContinue){
                console.log("Back Pressure");
                return res.once('drain', generateMore);
            }   
        }
        res.end('\n\n');//writable.end method signifies no more data will be written to the stream
    };
    generateMore();
    res.on('finish', () => console.log('Data has all been sent'));
});
server.listen(8080, () => {
    console.log('listening on http://localhost:8080')
});