import { createAlphabetIterator } from "./iterator-alphabet.js";

const iterator = createAlphabetIterator();
let iterationResult = iterator.next();
/*while (!iterationResult.done) {
    console.log(iterationResult.value);
    iterationResult = iterator.next();
}*/
for (const element of iterator) {
    console.log(element);
}