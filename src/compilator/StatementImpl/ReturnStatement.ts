import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
import ParseError from '../ParseError';

// TODO: allow null argument
export default class ReturnStatement implements Statement {
  expression: Expression;
  constructor(ast: ast.ReturnStatement) {
    if (ast.argument === null) {
      throw new ParseError('Null return argument', ast);
    }
    this.expression = Expression.fromNode(ast.argument);
  }

  process() {
    throw new Error('Method not implemented.');
  }
  visit(visitor: StatementVisitor): void {
    visitor.onReturn(this);
  }
}
