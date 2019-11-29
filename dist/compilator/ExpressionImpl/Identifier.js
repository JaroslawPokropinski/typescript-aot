"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: allow null argument
class Identifier {
    constructor(ast) {
        this.name = ast.name;
    }
    process() {
        throw new Error('Method not implemented.');
    }
    visit(visitor) {
        visitor.onIdentifier(this);
    }
}
exports.default = Identifier;
//# sourceMappingURL=Identifier.js.map