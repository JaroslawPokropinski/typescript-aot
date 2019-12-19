import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import StatementVisitor from '../StatementVisitor';
import CompilationDirector from '../CompilationDirector';


export default class BlockStatement implements Statement {
  body: Array<Statement>;

  constructor(ast: ast.BlockStatement, director: CompilationDirector) {

    this.body = ast.body.map((s) => {
        return Statement.fromNode(s, director);
    })
  }

  visit(visitor: StatementVisitor): void {
    visitor.onBlock(this);
  }
}
