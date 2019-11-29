import ReturnStatement from './StatementImpl/ReturnStatement';
import ExpressionStatement from './StatementImpl/ExpressionStatement';
import WhileStatement from './StatementImpl/WhileStatement';
import { IdentifierDeclaration } from './StatementImpl/VariableDeclarationStatement';
export default class StatementVisitor {
    onReturn(_s: ReturnStatement): void;
    onExpression(_s: ExpressionStatement): void;
    onWhile(_s: WhileStatement): void;
    onIdentifierDeclaration(_s: IdentifierDeclaration): void;
}
