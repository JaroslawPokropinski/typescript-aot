"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Literal {
    constructor(node) {
        this.node = node;
    }
    visit(visitor) {
        visitor.onLiteral(this);
    }
}
exports.default = Literal;
//# sourceMappingURL=Literal.js.map