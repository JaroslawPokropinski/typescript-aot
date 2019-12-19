import Identifier from './ExpressionImpl/Identifier';
import BinaryExpression from './ExpressionImpl/BinaryExpression';
import Literal from './ExpressionImpl/Literal';
import NewExpression from './ExpressionImpl/NewExpression';
import CallExpression from './ExpressionImpl/CallExpression';
import Expression from './Expression';

export default class ExpressionVisitor {
  onIdentifier(_e: Identifier) {
    throw new Error('Unimplemented method.');
  }
  onBinary(_e: BinaryExpression) {
    throw new Error('Unimplemented method.');
  }
  onLiteral(_e: Literal) {
    throw new Error('Unimplemented method.');
  }
  onNew(_e: NewExpression) {
    throw new Error('Unimplemented method.');
  }
  onCall(_e: CallExpression) {
    throw new Error('Unimplemented method.');
  }
  onGet(_e: { left: Expression, index: Expression }) {
    throw new Error('Unimplemented method.');
  }
}
