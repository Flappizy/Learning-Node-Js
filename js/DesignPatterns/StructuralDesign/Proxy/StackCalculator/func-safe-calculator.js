export function createSafeCalculator(calculator) {
    return {
        divide() {
            const divisor = calculator.peek();
            if (divisor === 0) {
                throw new Error("You can not divide by zero");
            }
        
            //If valid delegates to the subject
            return calculator.divide();
        },
        
        //delegated method
        getValue() {
            return calculator.getValue();
        },

        //delegated methods
        putValue(value) {
            return calculator.putValue(value);
        },

        //delegated method
        peekValue() {
            return calculator.peekValue();
        },

        //delegated method
        clear() {
            return calculator.clear();
        },

        //delegated method
        multiply() {
            return calculator.multiply();
        }
    }
}