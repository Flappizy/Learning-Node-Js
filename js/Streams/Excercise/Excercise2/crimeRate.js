import { AbstractAggregateDataClass } from './abstractClass.js';

export class PercentageOfCrimeThroughTheYears extends AbstractAggregateDataClass {
    constructor() {
        super();
    }
    
    processData(record) {
        const { year, value } = record;
        if(this.data[year]) {
            this.data[year] += Number(value);
        }
        else {
            this.data[year] = Number(value);
        }
    }

    answerQuestion() {
        return this.data;
    }
}