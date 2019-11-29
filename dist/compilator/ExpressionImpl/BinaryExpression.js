"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = __importDefault(require("../Expression"));
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const ParseError_1 = __importDefault(require("../ParseError"));
// TODO: better left side validation
class BinaryExpression {
    constructor(ast) {
        this.right = Expression_1.default.fromNode(ast.right);
        this.op = ast.operator;
        // this.left.assignable()
        if (ast.left.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
            throw new ParseError_1.default('Left side of assignment must be Identifier', ast.left);
        }
        this.left = Expression_1.default.fromNode(ast.left);
    }
    process() {
        throw new Error('Method not implemented.');
    }
    visit(visitor) {
        visitor.onBinary(this);
    }
}
exports.default = BinaryExpression;
//# sourceMappingURL=BinaryExpression.js.map