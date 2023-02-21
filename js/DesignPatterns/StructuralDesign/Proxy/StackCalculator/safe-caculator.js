export class SafeCalculator {
    constructor(calculator) {
        this.calculator = calculator;
    }

    //proxied method
    divide() {
        const divisor = this.calculator.peek();
        if (divisor === 0) {
            throw new Error("You can not divide by zero");
        }
        
        //If valid delegates to the subject
        return this.calculator.divide();
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