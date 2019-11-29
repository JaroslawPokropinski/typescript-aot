import Expression from '.';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import CompilationContext from '..';
export default class BinaryExpression implements Expression {
    context: CompilationContext;
    left: estree.Expression;
    right: estree.Expression;
    operator: string;
    constructor(context: CompilationContext, estExpression: estree.BinaryExpression);
    getType(): number;
    getExpression(): number;
}
