import Statement from './';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import CompilationContext from '..';

export default class ReturnStatement implements Statement {
  argument: Expression;

  constructor(
    private context: CompilationContext,
    estStatement: estree.ReturnStatement
  ) {
    const argument = estStatement.argument;
    if (argument === null) {
      // TODO: allow it
      throw new Error('Null return argument');
    }
    const expr = this.context.getExpression(argument);
    if (expr === null) {
      throw new Error('Unknown expression');
    }
    this.argument = expr;
  }

  getControlFlow(): number {
    // evaluate expression
    // return value
    const bmodule = this.context.bmodule;
    const arg = this.argument.getExpression();
    return bmodule.return(arg);
    // throw new Error('Method not implemented.');
  }
}
