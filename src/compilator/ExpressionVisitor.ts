import Identifier from './ExpressionImpl/Identifier';
import BinaryExpression from './ExpressionImpl/BinaryExpression';
import Literal from './ExpressionImpl/Literal';

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
}
