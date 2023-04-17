export default class Calculator {
    static sum(operands: number[]): number {
        return operands.reduce((x, y) => x + y, 0);
    }
}
