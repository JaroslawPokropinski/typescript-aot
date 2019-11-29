import Statement from './';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import CompilationContext from '..';
export default class ReturnStatement implements Statement {
    private context;
    argument: Expression;
    constructor(context: CompilationContext, estStatement: estree.ReturnStatement);
    getControlFlow(): number;
}
