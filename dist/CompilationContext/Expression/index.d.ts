import binaryen = require('binaryen');
export default interface Expression {
    getExpression(): number;
    getType(): binaryen.Type;
}
