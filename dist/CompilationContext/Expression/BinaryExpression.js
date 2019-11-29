"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = __importDefault(require("../Type"));
class BinaryExpression {
    constructor(context, estExpression) {
        this.context = context;
        this.left = estExpression.left;
        this.right = estExpression.right;
        this.operator = estExpression.operator;
    }
    getType() {
        const esLeft = this.context.getExpression(this.left);
        if (!esLeft) {
            throw new Error('Invalid exception');
        }
        return esLeft.getType();
    }
    getExpression() {
        // TODO: implement and add more
        const esLeft = this.context.getExpression(this.left);
        const esRight = this.context.getExpression(this.right);
        if (!esLeft || !esRight) {
            throw new Error('Invalid exception');
        }
        switch (this.operator) {
            case '+':
                const typeUtil = new Type_1.default(this.getType());
                return typeUtil
                    .getOperations(this.context.bmodule)
                    .add(esLeft.getExpression(), esRight.getExpression());
            // switch (this.getType()) {
            // case binaryen.i32:
            //   return this.context.bmodule.i32.add(
            //     esLeft.getExpression(),
            //     esRight.getExpression()
            //   );
            // default:
            //   throw new Error('Not implemented.');
            // }
            default:
                throw new Error(`Not implemented: ${this.operator}`);
        }
    }
}
exports.default = BinaryExpression;
//# sourceMappingURL=BinaryExpression.js.map