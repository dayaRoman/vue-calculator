export default class Calculator {
    static sum(operands: number[]): number {
        return operands[0] + operands[1];
    }

    static minus(operands: number[]): number {
        return operands[0] - operands[1];
    }

    static division(operands: number[]): number {
        return operands[0] / operands[1];
    }
    
    static multiply(operands: number[]): number {
        return operands[0] * operands[1];
    }
}
