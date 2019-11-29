"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatementVisitor {
    onReturn(_s) {
        throw new Error('Unimplemented method.');
    }
    onExpression(_s) {
        throw new Error('Unimplemented method.');
    }
    onWhile(_s) {
        throw new Error('Unimplemented method.');
    }
    onIdentifierDeclaration(_s) {
        throw new Error('Unimplemented method.');
    }
}
exports.default = StatementVisitor;
//# sourceMappingURL=StatementVisitor.js.map