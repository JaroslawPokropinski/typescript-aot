import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
export default class Identifier implements Expression {
    name: string;
    constructor(ast: ast.Identifier);
    process(): void;
    visit(visitor: ExpressionVisitor): void;
}
