import CompilationBuilder from './CompilationBuilder';
import Method from './Method';
import StatementVisitor from './StatementVisitor';
import ExpressionStatement from './StatementImpl/ExpressionStatement';
import ReturnStatement from './StatementImpl/ReturnStatement';
import ExpressionVisitor from './ExpressionVisitor';
import Identifier from './ExpressionImpl/Identifier';
import BinaryExpression from './ExpressionImpl/BinaryExpression';
import Expression from './Expression';
import Statement from './Statement';
import WhileStatement from './StatementImpl/WhileStatement';
import Literal from './ExpressionImpl/Literal';
import { IdentifierDeclaration } from './StatementImpl/VariableDeclarationStatement';

class LlvmStatementVisitor extends StatementVisitor {
  text = '';
  visit(s: Statement): string {
    this.text = '';
    s.visit(this);
    return this.text;
  }

  onExpression(s: ExpressionStatement) {
    const ev = new LlvmExpressionVisitor();
    this.text = `${s.left.name} ${s.operator} ${ev.visit(s.right)};`;
  }

  onReturn(s: ReturnStatement) {
    const ev = new LlvmExpressionVisitor();
    this.text = `return ${ev.visit(s.expression)};`;
  }

  onWhile(s: WhileStatement) {
    const ev = new LlvmExpressionVisitor();
    this.text = `while (${ev.visit(s.test)}) {\n`;
    for (let st of s.body) {
      this.text += `${this.visit(st)}\n`;
    }
    this.text += `}\n`;
  }

  onIdentifierDeclaration(s: IdentifierDeclaration) {
    const v = new LlvmExpressionVisitor();
    const ctype = mapType(s.type);
    this.text = `${ctype} ${s.name}`;
    if (s.init) {
      this.text += ` = ${v.visit(s.init)}`;
    }
    this.text += ';';
  }
}

class LlvmExpressionVisitor extends ExpressionVisitor {
  text = '';

  visit(e: Expression): string {
    e.visit(this);
    return this.text;
  }

  onIdentifier(e: Identifier) {
    this.text = e.name;
  }

  onBinary(e: BinaryExpression) {
    const left = this.visit(e.left);
    const right = this.visit(e.right);
    this.text = `${left} ${e.op} ${right}`;
  }

  onLiteral(e: Literal) {
    this.text = e.node.raw;
  }
}

function mapType(t?: string) {
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

export default class LlvmBuilder implements CompilationBuilder {
  text = '';
  getText(): string {
    return this.text;
  }
  getBinary(): string {
    return 'llvm bin';
  }

  create(method: Method) {
    const parameters = method.parameters
      .map((p) => `${mapType(p.typeName.name)} ${p.name.name}`)
      .join(', ');
    this.text = `${header}${funcHeader}${mapType(method.returnTypeName)} ${
      method.name
    }(${parameters}) {\n`;

    method.statements.forEach((s) => {
      const v = new LlvmStatementVisitor();
      s.visit(v);
      this.text += v.text + '\n';
    });
    this.text += '}';
  }
}
