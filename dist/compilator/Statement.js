"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const ParseError_1 = __importDefault(require("./ParseError"));
const ReturnStatement_1 = __importDefault(require("./StatementImpl/ReturnStatement"));
const ExpressionStatement_1 = __importDefault(require("./StatementImpl/ExpressionStatement"));
const WhileStatement_1 = __importDefault(require("./StatementImpl/WhileStatement"));
const VariableDeclarationStatement_1 = __importDefault(require("./StatementImpl/VariableDeclarationStatement"));
class Statement {
    static fromNode(node) {
        switch (node.type) {
            case typescript_estree_1.AST_NODE_TYPES.ReturnStatement:
                return new ReturnStatement_1.default(node);
            case typescript_estree_1.AST_NODE_TYPES.ExpressionStatement:
                return new ExpressionStatement_1.default(node);
            case typescript_estree_1.AST_NODE_TYPES.WhileStatement:
                return new WhileStatement_1.default(node);
            case typescript_estree_1.AST_NODE_TYPES.VariableDeclaration:
                return new VariableDeclarationStatement_1.default(node);
            default:
                throw new ParseError_1.default('Unknown statement.', node);
        }
    }
}
exports.default = Statement;
//# sourceMappingURL=Statement.js.map