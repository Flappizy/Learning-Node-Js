import { StackCalculator } from "../Proxy/StackCalculator/stack-calculator.js";

const handler = {
    get: (target, prop) => {
        if (prop === 'divide') {
            return function() {
                const divisor = target.peek();
                if (divisor === 0) {
                    throw new Error("You can not divide by Zero");
                }
                
                target.divide();
            }
        }
        else if(prop === 'add') {
            return function() {
                const addend2 = target.getValue();
                const addend1 = target.getValue();
                const result = addend1 + addend2;
                target.putValue(result);
                return result;
            }
        }

        return target[prop];
    }
}

const stackCalculator = new StackCalculator();
const enhancedCalculator = new Proxy(stackCalculator, handler);
enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());
enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply());