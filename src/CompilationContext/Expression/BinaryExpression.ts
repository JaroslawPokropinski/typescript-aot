import Expression from '.';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import CompilationContext from '..';
import binaryen = require('binaryen');

export default class BinaryExpression implements Expression {
  context: CompilationContext;
  left: estree.Expression;
  right: estree.Expression;
  operator: string;

  constructor(
    context: CompilationContext,
    estExpression: estree.BinaryExpression
  ) {
    this.context = context;
    this.left = estExpression.left;
    this.right = estExpression.right;
    this.operator = estExpression.operator;
  }

  getType(): number {
    const esLeft = this.context.getExpression(this.left);
    if (!esLeft) {
      throw new Error('Invalid exception');
    }
    return esLeft.getType();
  }

  getExpression(): number {
    // TODO: implement and add more
    const esLeft = this.context.getExpression(this.left);
    const esRight = this.context.getExpression(this.right);
    if (!esLeft || !esRight) {
      throw new Error('Invalid exception');
    }

    switch (this.operator) {
      case '+':
        switch (this.getType()) {
          case binaryen.i32:
            return this.context.bmodule.i32.add(
              esLeft.getExpression(),
              esRight.getExpression()
            );
          default:
            throw new Error('Not implemented.');
        }
      default:
        throw new Error('Not implemented.');
    }
  }
}
