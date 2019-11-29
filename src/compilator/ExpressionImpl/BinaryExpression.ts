import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import ParseError from '../ParseError';

// TODO: better left side validation
export default class BinaryExpression implements Expression {
  left: Expression;
  right: Expression;
  op: string;
  constructor(ast: ast.BinaryExpression) {
    this.right = Expression.fromNode(ast.right);
    this.op = ast.operator;
    // this.left.assignable()
    if (ast.left.type !== AST_NODE_TYPES.Identifier) {
      throw new ParseError(
        'Left side of assignment must be Identifier',
        ast.left
      );
    }
    this.left = Expression.fromNode(ast.left);
  }

  process() {
    throw new Error('Method not implemented.');
  }

  visit(visitor: ExpressionVisitor): void {
    visitor.onBinary(this);
  }
}
