"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const ParseError_1 = __importDefault(require("../ParseError"));
const Expression_1 = __importDefault(require("../Expression"));
const TypeUtil_1 = __importDefault(require("../TypeUtil"));
class IdentifierDeclaration {
    constructor(kind, name, type, init) {
        this.kind = kind;
        this.name = name;
        this.type = type;
        this.init = init;
    }
    visit(visitor) {
        visitor.onIdentifierDeclaration(this);
    }
}
exports.IdentifierDeclaration = IdentifierDeclaration;
class VariableDeclarationStatement {
    constructor(ast) {
        this.ast = ast;
        this.decl = this.ast.declarations.map((d) => {
            let init = undefined;
            if (d.init !== null) {
                init = Expression_1.default.fromNode(d.init);
            }
            switch (d.id.type) {
                case typescript_estree_1.AST_NODE_TYPES.Identifier:
                    const tname = TypeUtil_1.default.getTypeName(d.id);
                    return new IdentifierDeclaration(this.ast.kind, d.id.name, tname, init);
                default:
                    throw new ParseError_1.default('Unknown declaration statement', d);
            }
        });
    }
    process() {
        throw new Error('Method not implemented.');
    }
    visit(visitor) {
        this.decl.forEach((d) => {
            d.visit(visitor);
        });
    }
}
exports.default = VariableDeclarationStatement;
//# sourceMappingURL=VariableDeclarationStatement.js.map