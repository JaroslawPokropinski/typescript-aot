import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';

// TODO: allow null argument
export default class Identifier implements Expression {
  name: string;
  constructor(ast: ast.Identifier) {
    this.name = ast.name;
  }

  process() {
    throw new Error('Method not implemented.');
  }

  visit(visitor: ExpressionVisitor): void {
    visitor.onIdentifier(this);
  }
}
