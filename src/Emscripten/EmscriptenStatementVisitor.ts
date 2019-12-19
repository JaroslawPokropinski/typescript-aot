import EmscriptenExpressionVisitor from './EmscriptenExpressionVisitor';
import mapType from './mapType';

import StatementVisitor from "../compilator/StatementVisitor";
import Statement from "../compilator/Statement";
import ExpressionStatement from "../compilator/StatementImpl/ExpressionStatement";
import ReturnStatement from "../compilator/StatementImpl/ReturnStatement";
import WhileStatement from "../compilator/StatementImpl/WhileStatement";
import { IdentifierDeclaration } from "../compilator/StatementImpl/VariableDeclarationStatement";
import IfStatement from "../compilator/StatementImpl/IfStatement";
import BlockStatement from "../compilator/StatementImpl/BlockStatement";


export default class EmscriptenStatementVisitor extends StatementVisitor {
    text = '';
    visit(s: Statement): string {
      this.text = '';
      s.visit(this);
      return this.text;
    }
  
    onExpression(s: ExpressionStatement) {
      const ev = new EmscriptenExpressionVisitor();
      this.text = `${s.left.name} ${s.operator} ${ev.visit(s.right)};`;
    }
  
    onReturn(s: ReturnStatement) {
      const ev = new EmscriptenExpressionVisitor();
      this.text = `return ${ev.visit(s.expression)};`;
    }
  
    onWhile(s: WhileStatement) {
      const ev = new EmscriptenExpressionVisitor();
      this.text = `while (${ev.visit(s.test)}) {\n`;
      for (let st of s.body) {
        this.text += `  ${this.visit(st).replace(/\n/g, '\n  ')}\n`;
      }
      this.text += `}`;
    }
  
    onIdentifierDeclaration(s: IdentifierDeclaration) {
      const v = new EmscriptenExpressionVisitor();
      const ctype = mapType(s.type);
      this.text = `${ctype} ${s.name}`;
      if (s.init) {
        this.text += ` = ${v.visit(s.init)}`;
      }
      this.text += ';';
    }
  
    onIf(s: IfStatement) {
      const v = new EmscriptenExpressionVisitor();
      const b = this.visit(s.body);
      let e: string | null = null;
      if (s.elseBody) {
        e = this.visit(s.elseBody);
      }
      this.text = `if(${v.visit(s.test)}) ${b}`;
      if (e) {
        this.text += `else ${e}`;
      }
    }
  
    onBlock(s: BlockStatement) {
      const sts = s.body.map((s) => this.visit(s)).join('\n  ');
      this.text = `{\n  ${sts}\n}`;
    }
  }