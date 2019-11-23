import Expression from '.';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import CompilationContext from '..';

export default class Identifier implements Expression {
  context: CompilationContext;
  name: string;

  constructor(context: CompilationContext, estIdentifier: estree.Identifier) {
    this.context = context;
    this.name = estIdentifier.name;
  }

  getType(): number {
    return this.context.findVariable(this.name).type;
  }

  getExpression(): number {
    const param = this.context.getVariable(this.name);
    return param;
  }
}
