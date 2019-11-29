"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Method_1 = __importDefault(require("./Method"));
exports.Method = Method_1.default;
const binaryen_1 = __importDefault(require("binaryen"));
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const ReturnStatement_1 = __importDefault(require("./Statement/ReturnStatement"));
const Identifer_1 = __importDefault(require("./Expression/Identifer"));
const AssignmentStatement_1 = __importDefault(require("./Statement/AssignmentStatement"));
const BinaryExpression_1 = __importDefault(require("./Expression/BinaryExpression"));
const Type_1 = __importDefault(require("./Type"));
class Parameter {
    constructor(id, name, type, local) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.local = local;
    }
    getSize() {
        switch (this.type) {
            case binaryen_1.default.i32:
                return 1;
            case binaryen_1.default.i64:
                return 2;
            case binaryen_1.default.f32:
                return 1;
            case binaryen_1.default.f64:
                return 2;
            default:
                throw new Error('Unknown type');
        }
    }
}
class CompilationContext {
    constructor() {
        this.methods = [];
        this.bmodule = new binaryen_1.default.Module();
        this.localVariables = new Map();
        this.localVariableIndex = 0;
        this.returnType = 0;
        this.variableScope = {
            prev: null,
            variables: new Map(),
        };
        this.variableIndex = 0;
    }
    setReturn(name) {
        this.returnType = CompilationContext.getBinType(name);
    }
    addParameter(name, type) {
        if (this.localVariables.has(name)) {
            throw new Error('Variable already declared!');
        }
        const p = new Parameter(this.localVariableIndex, name, type, true);
        this.localVariableIndex++;
        this.localVariables.set(name, p);
    }
    addVariable(name, type) {
        if (this.variableScope.variables.has(name)) {
            throw new Error('Variable already declared!');
        }
        const p = new Parameter(this.variableIndex, name, type, false);
        this.variableIndex += p.getSize();
        this.variableScope.variables.set(name, p);
    }
    findVariable(name) {
        let scope = this.variableScope;
        // find variable in memory
        while (scope !== null) {
            if (scope.variables.has(name)) {
                const p = scope.variables.get(name);
                if (p === undefined) {
                    throw new Error('Unexpected error');
                }
                return p;
            }
            scope = scope.prev;
        }
        // find variable in local parameters
        if (this.localVariables.has(name)) {
            const p = this.localVariables.get(name);
            if (p === undefined) {
                throw new Error('Unexpected error');
            }
            return p;
        }
        throw new Error('Usage of undeclared variable');
    }
    getVariable(name) {
        const p = this.findVariable(name);
        if (p.local) {
            return this.bmodule.local.get(p.id, p.type);
        }
        else {
            const typeUtil = new Type_1.default(p.type);
            const op = typeUtil.getOperations(this.bmodule);
            return op.load(0, 0, op.const(p.id));
        }
    }
    setVariable(name, value) {
        const p = this.findVariable(name);
        if (p.local) {
            return this.bmodule.local.set(p.id, value);
        }
        else {
            const typeUtil = new Type_1.default(p.type);
            const op = typeUtil.getOperations(this.bmodule);
            return op.store(0, 0, op.const(p.id), value);
        }
    }
    addMethod(method) {
        this.methods.push(method);
    }
    static getBinType(type) {
        switch (type) {
            case 'Int':
                return binaryen_1.default.i32;
            case 'Float':
                return binaryen_1.default.f64;
            default:
                throw new Error('Unknown type');
        }
    }
    getStatement(estStatement) {
        switch (estStatement.type) {
            // TODO: implement statements
            case typescript_estree_1.AST_NODE_TYPES.ReturnStatement:
                return new ReturnStatement_1.default(this, estStatement);
            case typescript_estree_1.AST_NODE_TYPES.ExpressionStatement:
                switch (estStatement.expression.type) {
                    case typescript_estree_1.AST_NODE_TYPES.AssignmentExpression:
                        return new AssignmentStatement_1.default(this, estStatement.expression);
                    default:
                        return null;
                }
            case typescript_estree_1.AST_NODE_TYPES.ExpressionStatement:
            default:
                return null;
        }
    }
    getExpression(estExpression) {
        switch (estExpression.type) {
            // TODO: implement statements
            case typescript_estree_1.AST_NODE_TYPES.Identifier:
                return new Identifer_1.default(this, estExpression);
            case typescript_estree_1.AST_NODE_TYPES.BinaryExpression:
                return new BinaryExpression_1.default(this, estExpression);
            default:
                return null;
        }
    }
}
exports.default = CompilationContext;
//# sourceMappingURL=index.js.map