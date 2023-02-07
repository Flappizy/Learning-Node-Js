import { createProfiler } from "./profiler.js";

function factorsOfNumber(number) {
    const profiler = createProfiler(`Finding all factors of ${number}`);
    profiler.start();
    const factors = [];
    for (let factor = 2; factor <= number; factor++){
          if (number % factor === 0) {
            factors.push(factor);
          }     
   }
   profiler.end();
   return factors;
}

const myNumber = process.argv[2]
const myFactors = factorsOfNumber(myNumber);
console.log(`Factors of ${myNumber} are: `, myFactors)