"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseError extends Error {
    constructor(message, node) {
        super(message);
        this.message = message;
        this.node = node;
    }
}
exports.default = ParseError;
ParseError.prototype.toString = function () {
    return `${this.message} (${this.node.loc.start.line}, ${this.node.loc.start.column})`;
};
//# sourceMappingURL=ParseError.js.map