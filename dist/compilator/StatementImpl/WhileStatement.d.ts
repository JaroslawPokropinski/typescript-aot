import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
export default class WhileStatement implements Statement {
    test: Expression;
    body: Array<Statement>;
    constructor(ast: ast.WhileStatement);
    process(): void;
    visit(visitor: StatementVisitor): void;
}
