import { StackCalculator } from "./stack-calculator.js";

const safeCalculatorHandler = {
    get: (target, prop) => {
        if (prop === 'divide') {
            //proxied method
            return function() {
                const divisor = target.peek();
                if (divisor === 0) {
                    throw new Error("You can not divide by 0");
                }
                target.divide();
            }
        }
        return target[prop];
    }
}

const stackCalculator = new StackCalculator();
const proxyCal = new Proxy(stackCalculator, safeCalculatorHandler);
stackCalculator.putValue(2);
stackCalculator.putValue(0);

try {
    const result = proxyCal.divide();
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