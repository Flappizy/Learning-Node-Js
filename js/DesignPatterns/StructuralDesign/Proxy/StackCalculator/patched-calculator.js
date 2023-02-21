import { StackCalculator } from "./stack-calculator.js";

function patchedCalculator(calculator) {
    const originalDivisionMethod = calculator.divide;
    calculator.divide = () => {
        const divisor = calculator.peek();
        if (divisor === 0) {
            throw new Error("You can not divide by zero");
        }
        
        return originalDivisionMethod.apply(calculator);
    }
    return calculator;
}

const stackCalculator = new StackCalculator();
const newStackCalculator = new StackCalculator();
const patchCalculator = patchedCalculator(stackCalculator);

stackCalculator.putValue(2);
stackCalculator.putValue(0);

newStackCalculator.putValue(2);
newStackCalculator.putValue(0);

try {
    const result = patchCalculator.divide();
    console.log(result);   
} catch (error) {
    console.log(error.message);
}

try {
    const result = stackCalculator.divide();
    console.log(result);   
} catch (error) {
    console.log(error.message);
}

try {
    const result = newStackCalculator.divide();
    console.log(result);   
} catch (error) {
    console.log(error.message);
}
