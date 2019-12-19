import ReturnStatement from './StatementImpl/ReturnStatement';
import ExpressionStatement from './StatementImpl/ExpressionStatement';
import WhileStatement from './StatementImpl/WhileStatement';
import { IdentifierDeclaration } from './StatementImpl/VariableDeclarationStatement';
import IfStatement from './StatementImpl/IfStatement';
import BlockStatement from './StatementImpl/BlockStatement';

export default class StatementVisitor {
  onReturn(_s: ReturnStatement) {
    throw new Error('Unimplemented method.');
  }
  onExpression(_s: ExpressionStatement) {
    throw new Error('Unimplemented method.');
  }
  onWhile(_s: WhileStatement) {
    throw new Error('Unimplemented method.');
  }
  onIdentifierDeclaration(_s: IdentifierDeclaration) {
    throw new Error('Unimplemented method.');
  }
  onIf(_s: IfStatement) {
    throw new Error('Unimplemented method.');
  }
  onBlock(_s: BlockStatement) {
    throw new Error('Unimplemented method.');
  }
}
