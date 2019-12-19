import ExpressionVisitor from "../compilator/ExpressionVisitor";
import Expression from "../compilator/Expression";
import Identifier from "../compilator/ExpressionImpl/Identifier";
import BinaryExpression from "../compilator/ExpressionImpl/BinaryExpression";
import Literal from "../compilator/ExpressionImpl/Literal";
import NewExpression from "../compilator/ExpressionImpl/NewExpression";

export default class EmscriptenExpressionVisitor extends ExpressionVisitor {
    text = '';
  
    visit(e: Expression): string {
      this.text = 'It is an error!';
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
  
    onNew(e: NewExpression) {
      try {
        const t = mapType(e.callee.name);
        this.text = `((${t})${this.visit(e.args[0])})`
        return
      } catch(_e) {}
      
      this.text = `new ${this.visit(e.callee)}(${e.args.map((v) => this.visit(v)).join(',')})`;
    }
  
    // onCall(e: CallExpression) {
    //   this.text = `(${this.visit(e.left)}) ${e.operator} (${this.visit(e.right)})`;
    // }
    onGet(e: { left: Expression, index: Expression }) {
      this.text = `${this.visit(e.left)}->at(${this.visit(e.index)})`;
    }
  }
  
  function mapType(t?: string) {
    if (t !== undefined) {
      switch (t) {
        case 'Int':
          return 'int';
        case 'Float':
          return 'double';
        case 'CArray':
          return 'std::vector';
        default:
          throw new Error('Unknown type');
      }
    }
    return 'void';
  }