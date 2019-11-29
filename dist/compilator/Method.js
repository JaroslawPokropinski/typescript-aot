"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParseError_1 = __importDefault(require("./ParseError"));
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const Statement_1 = __importDefault(require("./Statement"));
function getParameterInfo(parameter) {
    if (parameter.type !== 'Identifier') {
        throw new ParseError_1.default('Parameter must be Identifier.', parameter);
    }
    if (parameter.typeAnnotation === undefined) {
        throw new ParseError_1.default('Parameter must have type annotation.', parameter);
    }
    if (parameter.typeAnnotation.typeAnnotation.type !== 'TSTypeReference') {
        throw new ParseError_1.default('Parameter type annotation must be type reference.', parameter);
    }
    if (parameter.typeAnnotation.typeAnnotation.typeName.type !== 'Identifier') {
        throw new ParseError_1.default('Parameter type name must be Identifier.', parameter);
    }
    return {
        name: parameter,
        typeName: parameter.typeAnnotation.typeAnnotation.typeName,
    };
}
class Method {
    constructor(node, builder) {
        this.statements = Array();
        this.parameters = Array();
        if (node.key.type !== 'Identifier') {
            throw new ParseError_1.default('Method key must be Identifier', node);
        }
        this.name = node.key.name;
        if (node.value.type !== 'FunctionExpression') {
            throw new ParseError_1.default('Method must be FunctionExpression', node);
        }
        const parameters = node.value.params;
        for (let i = 0; i < parameters.length; i++) {
            const parameter = parameters[i];
            this.parameters.push(getParameterInfo(parameter));
        }
        if (node.value.returnType) {
            const retTA = node.value.returnType.typeAnnotation;
            if (retTA.type !== typescript_estree_1.AST_NODE_TYPES.TSTypeReference ||
                retTA.typeName.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
                throw new ParseError_1.default('Cannot get return type', node);
            }
            this.returnTypeName = retTA.typeName.name;
        }
        if (!node.value.body) {
            throw new ParseError_1.default('Unexpected empty body', node.value);
        }
        const astStatements = node.value.body.body;
        for (let i = 0; i < astStatements.length; i++) {
            const astStatement = astStatements[i];
            const statement = Statement_1.default.fromNode(astStatement);
            this.statements.push(statement);
        }
    }
    process() { }
}
exports.default = Method;
Method.prototype.toString = function () {
    return `name: ${this.name}, statements: ${this.statements}`;
};
//# sourceMappingURL=Method.js.map