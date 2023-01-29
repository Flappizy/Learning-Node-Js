import { EventEmitter } from 'events';
import { readFile, readFileSync } from 'fs';

export class FindRegexClass extends EventEmitter {
    
    constructor (regex) {
        //Test the super
        super();
        this.files = [];
        this.regex = regex;
    }

    addFile (file) {
        this.files.push(file);
        return this;
    }

    findSync () {
        for (const file of this.files) {
            let content
            try {
                content = readFileSync(file, 'utf8')
            } catch (err) {
                this.emit('error', err)
            }
            this.emit('fileread', file)
            const match = content.match(this.regex)
            if (match) {
                match.forEach(elem => this.emit('found', file, elem))
            }
        }
        return this
    }

    find () {
        /* Excercise 3.1
        process.nextTick(() => this.emit('start', this.files));
        //this.emit('start', this.files);*/
        for (const file of this.files) {
            readFile(file, 'utf-8', (err, content) => {
                if (err) {
                    return this.emit('error', err);
                }

                this.emit('fileread', file);

                const match = content.match(this.regex);
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem));
                }
            });
        }
        return this;
    }
}