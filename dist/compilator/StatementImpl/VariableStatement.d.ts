import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import StatementVisitor from '../StatementVisitor';
export default class VariableDeclarationStatement implements Statement {
    constructor(ast: ast.VariableDeclaration);
    process(): void;
    visit(visitor: StatementVisitor): void;
}
