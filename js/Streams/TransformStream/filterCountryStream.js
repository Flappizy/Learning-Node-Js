import { Transform } from 'stream';

export class FilterByCountry extends Transform {
    constructor(country, options = {}) {
        options.objectMode = true;
        super(options);
        this.country = country;
    }

    _transform(record, encoding, cb) {
        if(record.country === this.country) {
            this.push(record);//This emits data to the next stream in the pipeline
        }
        cb();
    }
}