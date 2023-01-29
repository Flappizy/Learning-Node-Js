import fs from 'fs';

const originalReadFile = fs.readFile;
let mockedResponse = null;

export function mockedReadFile(path, cb) {
    setImmediate(() => {
        cb(null, mockedResponse);
    });
}

export function mockEnable(respondWith) {
    mockedResponse = respondWith;
    fs.readFile = mockedReadFile;
}

export function mockDisable() {
    fs.readFile = originalReadFile;
}