export class AbstractAggregateDataClass {
    constructor() {
        if(this.constructor === AbstractAggregateDataClass)
            throw new Error('Class can\'t be instantiated.');
        this.data = {};
        this.answer = {};
    }

    get processedData() {
        return this.data;  
    }

    processData() {
        throw new Error("Method 'processData()' must be implemented.");
    }

    anwserQuestion() {
        throw new Error("Method 'answerQuestion()' must be implemented.");
    }
}