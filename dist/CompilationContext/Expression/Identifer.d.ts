import Expression from '.';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import CompilationContext from '..';
export default class Identifier implements Expression {
    context: CompilationContext;
    name: string;
    constructor(context: CompilationContext, estIdentifier: estree.Identifier);
    getType(): number;
    getExpression(): number;
}
