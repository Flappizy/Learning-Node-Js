import { AbstractAggregateDataClass } from './abstractClass.js';

export class MostDangerousAreasInLondon extends AbstractAggregateDataClass {
    constructor() {
        super();
    }
    
    processData(record) {
        const { borough, value } = record;
        if(!this.data[borough] && Number(value)) {
            this.data[borough] = Number(value);
        }
        else if(this.data[borough] && Number(value)) {
            this.data[borough] += Number(value);
        }
    }

    answerQuestion() {
        return Object.entries(this.data)
            .sort(([,a], [,b]) => b - a)//descending order
            .reduce((acc, [key, val]) => ({
                ...acc,
                [key]: val
            }), {});
    }
}