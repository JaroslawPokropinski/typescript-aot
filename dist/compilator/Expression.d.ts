import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import ExpressionVisitor from './ExpressionVisitor';
export default abstract class Expression {
    abstract visit(visitor: ExpressionVisitor): void;
    static fromNode(node: ast.Expression): Expression;
}
