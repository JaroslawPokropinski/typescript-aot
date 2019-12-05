import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import CompilationDirector from '../CompilationDirector';

export default class Literal implements Expression {
  constructor(public node: ast.Literal, _director: CompilationDirector) {}

  visit(visitor: import('../ExpressionVisitor').default): void {
    visitor.onLiteral(this);
  }
}
