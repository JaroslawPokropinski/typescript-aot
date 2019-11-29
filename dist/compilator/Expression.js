"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const ParseError_1 = __importDefault(require("./ParseError"));
const Identifier_1 = __importDefault(require("./ExpressionImpl/Identifier"));
const BinaryExpression_1 = __importDefault(require("./ExpressionImpl/BinaryExpression"));
const Literal_1 = __importDefault(require("./ExpressionImpl/Literal"));
class Expression {
    static fromNode(node) {
        switch (node.type) {
            case typescript_estree_1.AST_NODE_TYPES.Identifier:
                return new Identifier_1.default(node);
            case typescript_estree_1.AST_NODE_TYPES.BinaryExpression:
                return new BinaryExpression_1.default(node);
            case typescript_estree_1.AST_NODE_TYPES.Literal:
                return new Literal_1.default(node);
            default:
                throw new ParseError_1.default('Unknown expression.', node);
        }
    }
}
exports.default = Expression;
//# sourceMappingURL=Expression.js.map