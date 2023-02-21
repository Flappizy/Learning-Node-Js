function patchedCalculator(calculator) {
    calculator.add = () => {
        const addend2 = this.calculator.getValue();
        const addend1 = this.calculator.getValue();
        const result = addend1 + addend2;
        this.calculator.putValue(result);
        return result;
    }

    const currDivideMethod = calculator.divide();
    calculator.divide = () => {
        const divisor = this.calculator.peek();
        if (divisor === 0) {
            throw new Error("You can not divide by Zero");
        }
        
        currDivideMethod.apply(calculator);
    }

    return calculator;
}