import { FindRegexClass } from "./observableObject.js";

/*
findRegex(['fileA.txt', 'JobAppTrack.txt'], /hello \w+/g)
    .on('fileread', file => console.log(`This ${file} has been read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', err => console.error(`Error emitted ${err.message}`));*/

const listener1 = () => console.log('Listener 1 has been triggered');
const listener2 = () => console.log('Listener 2 has been triggered');
const listener3 = () => console.log('Listener 3 has been triggered');
const errorListener = err => console.error(`Error emitted ${err.message}`);

var findRegexClassInstance = new FindRegexClass(/hello \w+/g);
findRegexClassInstance
    .addFile('JobAppTrack.txt')
    .addFile('fileA.txt')
    .find()
    .on('fileread', listener1)
    .on('found', listener2)
    .on('error', errorListener)
    .on('start', (files) => console.log(`Async find process has started on ${files}`));

/*
findRegexClassInstance.removeListener('fileread', listener1);
findRegexClassInstance.removeListener('found', listener2);
findRegexClassInstance.removeListener('error', errorListener);*/