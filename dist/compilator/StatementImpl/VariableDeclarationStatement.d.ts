import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import StatementVisitor from '../StatementVisitor';
import Expression from '../Expression';
interface Declaration {
    visit(visitor: StatementVisitor): void;
}
export declare class IdentifierDeclaration implements Declaration {
    kind: string;
    name: string;
    type: string;
    init?: Expression;
    constructor(kind: string, name: string, type: string, init?: Expression);
    visit(visitor: StatementVisitor): void;
}
export default class VariableDeclarationStatement implements Statement {
    private ast;
    decl: Array<Declaration>;
    constructor(ast: ast.VariableDeclaration);
    process(): void;
    visit(visitor: StatementVisitor): void;
}
export {};
