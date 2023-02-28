import { Matrix } from "./matrix.js";

const multiDiArr = new Matrix([
    [11, 12],
    [13, 14],
    [15, 16],
    [17, 18]
]);
/*
const iterator = multiDiArr[Symbol.iterator]();
let iterationResult = iterator.next();
while (!iterationResult.done) {
    console.log(iterationResult.value);
    iterationResult = iterator.next();
}

for (const element of multiDiArr) {
    console.log(element);
}*/

const flattenedMatrix = [...multiDiArr];
console.log(flattenedMatrix);

const [first] = multiDiArr;
console.log(first);