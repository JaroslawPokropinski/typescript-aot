"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Statement_1 = __importDefault(require("../Statement"));
const Expression_1 = __importDefault(require("../Expression"));
const ParseError_1 = __importDefault(require("../ParseError"));
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
class WhileStatement {
    constructor(ast) {
        this.test = Expression_1.default.fromNode(ast.test);
        if (ast.body.type !== typescript_estree_1.AST_NODE_TYPES.BlockStatement) {
            throw new ParseError_1.default('While loop must have block body.', ast.body);
        }
        this.body = new Array();
        for (let s of ast.body.body) {
            this.body.push(Statement_1.default.fromNode(s));
        }
    }
    process() {
        throw new Error('Method not implemented.');
    }
    visit(visitor) {
        visitor.onWhile(this);
    }
}
exports.default = WhileStatement;
//# sourceMappingURL=WhileStatement.js.map