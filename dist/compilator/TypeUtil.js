"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const ParseError_1 = __importDefault(require("./ParseError"));
class TypeUtil {
    static getTypeName(node) {
        const t = node.typeAnnotation;
        if (t === undefined) {
            throw new ParseError_1.default('Declaration of variable requires type', node);
        }
        if (t.typeAnnotation.type !== typescript_estree_1.AST_NODE_TYPES.TSTypeReference) {
            throw new ParseError_1.default('Type must be TSTypeReference', t.typeAnnotation);
        }
        if (t.typeAnnotation.typeName.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
            throw new ParseError_1.default('Type must be Identifier', t.typeAnnotation.typeName);
        }
        return t.typeAnnotation.typeName.name;
    }
}
exports.default = TypeUtil;
//# sourceMappingURL=TypeUtil.js.map