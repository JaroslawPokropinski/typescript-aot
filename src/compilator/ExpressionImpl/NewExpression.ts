import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import ParseError from '../ParseError';
import Identifier from './Identifier';
import CompilationDirector from '../CompilationDirector';


export default class NewExpression implements Expression {
  args = new Array<Expression>();
  callee: Identifier
  constructor(ast: ast.NewExpression, director: CompilationDirector) {
    if (ast.callee.type !== AST_NODE_TYPES.Identifier) {
      throw new ParseError(`Expected "Identifier" got "${ast.callee.type}"`, ast.callee);
    }
    
    this.callee = new Identifier(ast.callee, director);

    ast.arguments.forEach((e) => {
      this.args.push(Expression.fromNode(e, director));
    });
  }

  visit(visitor: ExpressionVisitor): void {
      visitor.onNew(this);
  }
}
