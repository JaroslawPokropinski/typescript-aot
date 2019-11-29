import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
import Identifier from '../ExpressionImpl/Identifier';
export default class ExpressionStatement implements Statement {
    left: Identifier;
    right: Expression;
    operator: string;
    constructor(ast: ast.ExpressionStatement);
    process(): void;
    visit(visitor: StatementVisitor): void;
}
