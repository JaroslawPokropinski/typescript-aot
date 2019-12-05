import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
import CompilationDirector from '../CompilationDirector';

// TODO: allow null argument
export default class Identifier implements Expression {
  name: string;
  constructor(ast: ast.Identifier, _director: CompilationDirector) {
    this.name = ast.name;
  }

  visit(visitor: ExpressionVisitor): void {
    visitor.onIdentifier(this);
  }
}
