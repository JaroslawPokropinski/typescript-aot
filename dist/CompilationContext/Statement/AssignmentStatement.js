"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssignmentStatement {
    constructor(context, estStatement) {
        this.context = context;
        const left = estStatement.left;
        this.right = estStatement.right;
        this.operator = estStatement.operator;
        if (left.type !== 'Identifier') {
            throw new Error('Left side of assignment must be identifier');
        }
        if (this.operator !== '=') {
            throw new Error('Unimplemented assignment operator');
        }
        this.left = left;
    }
    getControlFlow() {
        const right = this.context.getExpression(this.right);
        if (right === null) {
            throw new Error('Bad expression');
        }
        const e = this.context.setVariable(this.left.name, right.getExpression());
        return e;
    }
}
exports.default = AssignmentStatement;
//# sourceMappingURL=AssignmentStatement.js.map