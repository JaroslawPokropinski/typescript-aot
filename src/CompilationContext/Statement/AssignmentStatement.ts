import Statement from './';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import CompilationContext from '..';

export default class AssignmentStatement implements Statement {
  left: estree.Identifier;
  right: estree.Expression;
  operator: string;

  constructor(
    private context: CompilationContext,
    estStatement: estree.AssignmentExpression
  ) {
    const left = estStatement.left;
    this.right = estStatement.right;
    this.operator = estStatement.operator;
    if (left.type !== 'Identifier') {
      throw new Error('Left side of assignment must be identifier');
    }
    if (this.operator !== '=') {
      throw new Error('Unimplemented assignment operator');
    }
    this.left = left;
  }

  getControlFlow(): number {
    const right = this.context.getExpression(this.right);
    if (right === null) {
      throw new Error('Bad expression');
    }
    const e = this.context.setVariable(this.left.name, right.getExpression());

    return e;
  }
}
