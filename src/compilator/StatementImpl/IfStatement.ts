import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
import CompilationDirector from '../CompilationDirector';


export default class IfStatement implements Statement {
  test: Expression;
  body: Statement;
  elseBody?: Statement;

  constructor(ast: ast.IfStatement, director: CompilationDirector) {
    this.test = Expression.fromNode(ast.test, director);

    this.body = Statement.fromNode(ast.consequent, director);
    if (ast.alternate) {
      this.elseBody = Statement.fromNode(ast.alternate, director);
    }
  }

  visit(visitor: StatementVisitor): void {
    visitor.onIf(this);
  }
}
