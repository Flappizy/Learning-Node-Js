import { StackCalculator } from "../Proxy/StackCalculator/stack-calculator.js";

class EnhancedCalculator {
    constructor(calculator) {
        this.calculator = calculator;
    }

    add() {
        const addend2 = this.calculator.getValue();
        const addend1 = this.calculator.getValue();
        const result = addend1 + addend2;
        this.calculator.putValue(result);
        return result;
    }

    divide() {
        const divisor = this.calculator.peek();
        if (divisor === 0) {
            throw new Error("You can not divide by Zero");
        }
        
        this.calculator.divide();
    }

     //delegated method
     getValue() {
        return this.calculator.getValue();
    }

    //delegated methods
    putValue(value) {
        return this.calculator.putValue(value);
    }

    //delegated method
    peekValue() {
        return this.calculator.peekValue();
    }

    //delegated method
    clear() {
        return this.calculator.clear();
    }

    //delegated method
    multiply() {
        return this.calculator.multiply();
    }
}

const calculator = new StackCalculator();
const enhancedCalculator = new EnhancedCalculator(calculator);
enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());
enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply());