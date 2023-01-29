import { createReadStream, createWriteStream } from 'fs';
import parallelTransform from 'parallel-transform';
import split from 'split';
import { pipeline } from 'stream';
import superagent from 'superagent';

pipeline(
    createReadStream(process.argv[2]),
    split(),
    parallelTransform(2,
        async(url, encoding, push, done) => {
            if(!url) {
                return done();
            }
            try {
                await superagent.head(url, { timeout: 5 * 1000 });
                push(`${url} is up\n`);
            } catch (error) {
                push(`${url} is down\n`);
            }
            done();
        }
    ),
    createWriteStream('result.txt'),
    (err) => {
        if(err) {
            console.log(err);
            process.exit(1);
        }
        console.log('All urls have been checked');
    }
)