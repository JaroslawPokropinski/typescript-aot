"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnStatement {
    constructor(context, estStatement) {
        this.context = context;
        const argument = estStatement.argument;
        if (argument === null) {
            // TODO: allow it
            throw new Error('Null return argument');
        }
        const expr = this.context.getExpression(argument);
        if (expr === null) {
            throw new Error('Unknown expression');
        }
        this.argument = expr;
    }
    getControlFlow() {
        // evaluate expression
        // return value
        const bmodule = this.context.bmodule;
        const arg = this.argument.getExpression();
        return bmodule.return(arg);
        // throw new Error('Method not implemented.');
    }
}
exports.default = ReturnStatement;
//# sourceMappingURL=ReturnStatement.js.map