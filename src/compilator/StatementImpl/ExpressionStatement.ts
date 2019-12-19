import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
import ParseError from '../ParseError';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import Identifier from '../ExpressionImpl/Identifier';
import CompilationDirector from '../CompilationDirector';

export default class ExpressionStatement implements Statement {
  left: Identifier;
  right: Expression;
  operator: string;

  constructor(ast: ast.ExpressionStatement, director: CompilationDirector) {
    if (ast.expression.type !== AST_NODE_TYPES.AssignmentExpression) {
      throw new ParseError(
        'Unexprected ExpressionStatement type',
        ast.expression
      );
    }

    if (ast.expression.left.type !== 'Identifier') {
      throw new ParseError(
        'Left side of assignment must be identifier',
        ast.expression.left
      );
    }

    this.left = new Identifier(ast.expression.left, director);
    this.right = Expression.fromNode(ast.expression.right, director);
    this.operator = ast.expression.operator;
  }

  visit(visitor: StatementVisitor): void {
    visitor.onExpression(this);
  }
}
