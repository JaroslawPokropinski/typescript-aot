import Statement from './';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import CompilationContext from '..';
export default class AssignmentStatement implements Statement {
    private context;
    left: estree.Identifier;
    right: estree.Expression;
    operator: string;
    constructor(context: CompilationContext, estStatement: estree.AssignmentExpression);
    getControlFlow(): number;
}
