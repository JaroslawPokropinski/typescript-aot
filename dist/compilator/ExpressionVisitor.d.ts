import Identifier from './ExpressionImpl/Identifier';
import BinaryExpression from './ExpressionImpl/BinaryExpression';
import Literal from './ExpressionImpl/Literal';
export default class ExpressionVisitor {
    onIdentifier(_e: Identifier): void;
    onBinary(_e: BinaryExpression): void;
    onLiteral(_e: Literal): void;
}
