import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
import ParseError from '../ParseError';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import CompilationDirector from '../CompilationDirector';

export default class WhileStatement implements Statement {
  test: Expression;
  body: Array<Statement>;

  constructor(ast: ast.WhileStatement, director: CompilationDirector) {
    this.test = Expression.fromNode(ast.test, director);

    if (ast.body.type !== AST_NODE_TYPES.BlockStatement) {
      throw new ParseError('While loop must have block body.', ast.body);
    }
    this.body = new Array<Statement>();
    for (let s of ast.body.body) {
      this.body.push(Statement.fromNode(s, director));
    }
  }

  visit(visitor: StatementVisitor): void {
    visitor.onWhile(this);
  }
}
