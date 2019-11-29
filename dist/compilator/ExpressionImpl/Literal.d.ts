import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
export default class Literal implements Expression {
    node: ast.Literal;
    constructor(node: ast.Literal);
    visit(visitor: import('../ExpressionVisitor').default): void;
}
