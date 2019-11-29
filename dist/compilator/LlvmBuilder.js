"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatementVisitor_1 = __importDefault(require("./StatementVisitor"));
const ExpressionVisitor_1 = __importDefault(require("./ExpressionVisitor"));
class LlvmStatementVisitor extends StatementVisitor_1.default {
    constructor() {
        super(...arguments);
        this.text = '';
    }
    visit(s) {
        this.text = '';
        s.visit(this);
        return this.text;
    }
    onExpression(s) {
        const ev = new LlvmExpressionVisitor();
        this.text = `${s.left.name} ${s.operator} ${ev.visit(s.right)};`;
    }
    onReturn(s) {
        const ev = new LlvmExpressionVisitor();
        this.text = `return ${ev.visit(s.expression)};`;
    }
    onWhile(s) {
        const ev = new LlvmExpressionVisitor();
        this.text = `while (${ev.visit(s.test)}) {\n`;
        for (let st of s.body) {
            this.text += `${this.visit(st)}\n`;
        }
        this.text += `}\n`;
    }
    onIdentifierDeclaration(s) {
        const v = new LlvmExpressionVisitor();
        const ctype = mapType(s.type);
        this.text = `${ctype} ${s.name}`;
        if (s.init) {
            this.text += ` = ${v.visit(s.init)}`;
        }
        this.text += ';';
    }
}
class LlvmExpressionVisitor extends ExpressionVisitor_1.default {
    constructor() {
        super(...arguments);
        this.text = '';
    }
    visit(e) {
        e.visit(this);
        return this.text;
    }
    onIdentifier(e) {
        this.text = e.name;
    }
    onBinary(e) {
        const left = this.visit(e.left);
        const right = this.visit(e.right);
        this.text = `${left} ${e.op} ${right}`;
    }
    onLiteral(e) {
        this.text = e.node.raw;
    }
}
function mapType(t) {
    if (t !== undefined) {
        switch (t) {
            case 'Int':
                return 'int';
            case 'Float':
                return 'double';
            default:
                throw new Error('Unknown type');
        }
    }
    return 'void';
}
const header = '#include <emscripten.h>\n\n';
const funcHeader = 'EMSCRIPTEN_KEEPALIVE\n';
class LlvmBuilder {
    constructor() {
        this.text = '';
    }
    getText() {
        return this.text;
    }
    getBinary() {
        return 'llvm bin';
    }
    create(method) {
        const parameters = method.parameters
            .map((p) => `${mapType(p.typeName.name)} ${p.name.name}`)
            .join(', ');
        this.text = `${header}${funcHeader}${mapType(method.returnTypeName)} ${method.name}(${parameters}) {\n`;
        method.statements.forEach((s) => {
            const v = new LlvmStatementVisitor();
            s.visit(v);
            this.text += v.text + '\n';
        });
        this.text += '}';
    }
}
exports.default = LlvmBuilder;
//# sourceMappingURL=LlvmBuilder.js.map