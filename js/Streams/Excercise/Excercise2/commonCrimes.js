import { AbstractAggregateDataClass } from "./abstractClass.js";

export class CommonCrimesAggregator extends AbstractAggregateDataClass {
    constructor() {
        super();
    }
    
    processData(record) {
      const { borough, minor_category, value } = record;
      if (!this.data[borough] && Number(value)) {
        this.data[borough] = { [minor_category]: Number(value) };
      } else if (this.data[borough]) {
        if(!this.data[borough][minor_category]) {
          this.data[borough][minor_category] = Number(value);
        } else {
          this.data[borough][minor_category] += Number(value);
        }
      }
    }
  
    answerQuestion() {
        let minMaxCrimes = {};

        Object.entries(this.data).forEach(([key, value]) => {
          let maxNum = 0;
          let minNum = 0;
          let maxCrime = null;
          let minCrime = null;
        
          Object.entries(value).forEach(([crime, number]) => {
            if (number > maxNum) {
              maxNum = number;
              maxCrime = crime;
            }
            if (number < minNum) {
              minNum = number;
              minCrime = crime;
            }
          });
        
          minMaxCrimes[key] = { [maxCrime]: maxNum, [minCrime]: minNum };
        });
  
      this.answer = minMaxCrimes
  
      return this.answer;
    }
  }