"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = __importDefault(require("../Expression"));
const ParseError_1 = __importDefault(require("../ParseError"));
// TODO: allow null argument
class ReturnStatement {
    constructor(ast) {
        if (ast.argument === null) {
            throw new ParseError_1.default('Null return argument', ast);
        }
        this.expression = Expression_1.default.fromNode(ast.argument);
    }
    process() {
        throw new Error('Method not implemented.');
    }
    visit(visitor) {
        visitor.onReturn(this);
    }
}
exports.default = ReturnStatement;
//# sourceMappingURL=ReturnStatement.js.map