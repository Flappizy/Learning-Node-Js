import { readFileSync } from 'fs';
import { syncBuiltinESMExports } from 'module';
import { mockDisable, mockEnable } from './mock-read-file-v2.js';

mockEnable(Buffer.from('Hello World'));
syncBuiltinESMExports();
//console.log(fs.readFileSync === readFileSync);

readFileSync('fake_path', (error, data) => {
    if(error) {
        console.log(error);
        process.exit(1);
    }
    console.log(data.toString());
});

mockDisable();