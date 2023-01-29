import fs from 'fs';
import { mockEnable, mockDisable } from './mock-read-file.js'; 

mockEnable(Buffer.from('Hello World'));

fs.readFile('fake_path', (error, data) => {
    if(error) {
        console.log(error);
        process.exit(1);
    }
    console.log(data.toString());
})

mockDisable();
