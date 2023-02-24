import { createInMemoryFSAdapter } from "./in-mem-fs-adapter.js";

const tempStore = new Map();
const fs = createInMemoryFSAdapter(tempStore);

fs.writeFile('file.txt', 'Hello!', () => {
    fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
        if (err) {
            return console.error(err);
        }
        console.log(res);
    });
});

fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
    console.error(err)
}); 