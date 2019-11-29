"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Identifier {
    constructor(context, estIdentifier) {
        this.context = context;
        this.name = estIdentifier.name;
    }
    getType() {
        return this.context.findVariable(this.name).type;
    }
    getExpression() {
        const param = this.context.getVariable(this.name);
        return param;
    }
}
exports.default = Identifier;
//# sourceMappingURL=Identifer.js.map