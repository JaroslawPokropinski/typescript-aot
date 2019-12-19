import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import ParseError from '../ParseError';
import CompilationDirector from '../CompilationDirector';

// TODO: better left side validation
export default class BinaryExpression implements Expression {
  left: Expression;
  right: Expression;
  op: string;
  constructor(ast: ast.BinaryExpression, director: CompilationDirector) {
    this.right = Expression.fromNode(ast.right, director);
    this.op = ast.operator;
    // this.left.assignable()
    if (ast.left.type !== AST_NODE_TYPES.Identifier) {
      throw new ParseError(
        'Left side of assignment must be Identifier',
        ast.left
      );
    }
    this.left = Expression.fromNode(ast.left, director);
  }

  static create(left: Expression, right: Expression, op: string) {
    const be: BinaryExpression = {left, right, op, visit: function(visitor: ExpressionVisitor) {visitor.onBinary(this);}};
    return be;
  }

  visit(visitor: ExpressionVisitor): void {
    visitor.onBinary(this);
  }
}
