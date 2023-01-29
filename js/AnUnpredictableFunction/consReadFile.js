import { readFileSync } from 'fs';

const cache = new Map();

function consistentRead(fileName) {
    if(cache.get(fileName)) {
        return cache.get(fileName);
    }
    else {
        const data = readFileSync(fileName, 'utf-8');
        cache.set(fileName, data);
        return data;
    }
}
