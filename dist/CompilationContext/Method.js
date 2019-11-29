"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parameter {
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}
class Method {
    constructor(compilationCtx) {
        this.compilationCtx = compilationCtx;
        this.parameters = Array();
        this.statements = Array();
    }
    getControlFlow() {
        if (!this.name) {
            throw new Error('No anonymous methods allowed');
        }
        const bmodule = this.compilationCtx.bmodule;
        bmodule.addFunction(this.name, bmodule.addFunctionType('iii', this.compilationCtx.returnType, Array.from(this.compilationCtx.localVariables.values()).map((p) => p.type)), [], bmodule.block('block', this.statements.map((st) => st.getControlFlow())));
        bmodule.addFunctionExport(this.name, this.name);
    }
}
exports.default = Method;
Method.prototype.toString = function methodToString() {
    let stringBuilder = Array();
    if (this.name) {
        stringBuilder.push(this.name);
    }
    for (let i = 0; i < this.parameters.length; i++) {
        const parameter = this.parameters[i];
        stringBuilder.push(`${parameter.name}: ${parameter.type}`);
    }
    return stringBuilder.join('\n');
};
//# sourceMappingURL=Method.js.map