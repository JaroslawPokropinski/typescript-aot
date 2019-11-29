import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import StatementVisitor from './StatementVisitor';
export default abstract class Statement {
    abstract process(): any;
    abstract visit(visitor: StatementVisitor): void;
    static fromNode(node: ast.Statement): Statement;
}
