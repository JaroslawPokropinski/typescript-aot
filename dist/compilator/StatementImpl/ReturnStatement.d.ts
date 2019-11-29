import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
export default class ReturnStatement implements Statement {
    expression: Expression;
    constructor(ast: ast.ReturnStatement);
    process(): void;
    visit(visitor: StatementVisitor): void;
}
