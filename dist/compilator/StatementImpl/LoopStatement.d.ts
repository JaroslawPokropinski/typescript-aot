import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import StatementVisitor from '../StatementVisitor';
import Identifier from '../ExpressionImpl/Identifier';
export default class LoopStatement implements Statement {
    left: Identifier;
    right: Expression;
    operator: string;
    constructor(ast: ast.WhileStatement);
    process(): void;
    visit(visitor: StatementVisitor): void;
}
