import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
export default class BinaryExpression implements Expression {
    left: Expression;
    right: Expression;
    op: string;
    constructor(ast: ast.BinaryExpression);
    process(): void;
    visit(visitor: ExpressionVisitor): void;
}
