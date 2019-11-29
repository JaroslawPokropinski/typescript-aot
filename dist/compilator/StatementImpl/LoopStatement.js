"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = __importDefault(require("../Expression"));
const ParseError_1 = __importDefault(require("../ParseError"));
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const Identifier_1 = __importDefault(require("../ExpressionImpl/Identifier"));
class LoopStatement {
    constructor(ast) {
        if (ast.expression.type !== typescript_estree_1.AST_NODE_TYPES.AssignmentExpression) {
            throw new ParseError_1.default('Unexprected ExpressionStatement type', ast.expression);
        }
        if (ast.expression.left.type !== 'Identifier') {
            throw new ParseError_1.default('Left side of assignment must be identifier', ast.expression.left);
        }
        this.left = new Identifier_1.default(ast.expression.left);
        this.right = Expression_1.default.fromNode(ast.expression.right);
        this.operator = ast.expression.operator;
    }
    process() {
        throw new Error('Method not implemented.');
    }
    visit(visitor) {
        visitor.onExpression(this);
    }
}
exports.default = LoopStatement;
//# sourceMappingURL=LoopStatement.js.map