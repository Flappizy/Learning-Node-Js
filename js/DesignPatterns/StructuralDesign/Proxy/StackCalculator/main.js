import { SafeCalculator } from "./safe-caculator.js";
import { StackCalculator } from "./stack-calculator.js";

const calculator = new StackCalculator();
const safeCalculator = new SafeCalculator(calculator);
calculator.putValue(3);
calculator.putValue(2);
console.log(calculator.multiply()); // 3*2 = 6
safeCalculator.putValue(2);
console.log(safeCalculator.multiply());// 6*2 = 12
calculator.putValue(0)
console.log(calculator.divide()); // 12/0 = Infinity
safeCalculator.clear();
safeCalculator.putValue(4)
safeCalculator.putValue(0)
try {
    safeCalculator.divide() // 4/0 -> Error
} catch (error) {
    console.log("You can not divide by 0");
}