import fs from 'fs';

const originalReadFile = fs.readFileSync;
let mockedResponse = null;

export function mockedReadFile(path, cb) {
    setImmediate(() => {
        cb(null, mockedResponse);
    });
}

export function mockEnable(respondWith) {
    mockedResponse = respondWith;
    fs.readFileSync = mockedReadFile;
}

export function mockDisable() {
    fs.readFileSync = originalReadFile;
}