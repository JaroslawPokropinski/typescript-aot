import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import StatementVisitor from './StatementVisitor';
import ParseError from './ParseError';
import ReturnStatement from './StatementImpl/ReturnStatement';
import ExpressionStatement from './StatementImpl/ExpressionStatement';
import WhileStatement from './StatementImpl/WhileStatement';
import VariableDeclarationStatement from './StatementImpl/VariableDeclarationStatement';
import CompilationDirector from './CompilationDirector';
import IfStatement from './StatementImpl/IfStatement';
import BlockStatement from './StatementImpl/BlockStatement';

export default abstract class Statement {
  abstract visit(visitor: StatementVisitor): void;

  static fromNode(node: ast.Statement, director: CompilationDirector): Statement {
    switch (node.type) {
      case AST_NODE_TYPES.ReturnStatement:
        return new ReturnStatement(node, director);
      case AST_NODE_TYPES.ExpressionStatement:
        return new ExpressionStatement(node, director);
      case AST_NODE_TYPES.WhileStatement:
        return new WhileStatement(node, director);
      case AST_NODE_TYPES.VariableDeclaration:
        return new VariableDeclarationStatement(node, director);
      case AST_NODE_TYPES.IfStatement:
        return new IfStatement(node, director);
      case AST_NODE_TYPES.BlockStatement:
        return new BlockStatement(node, director);
      default:
        throw new ParseError(`Unknown statement: ${node.type}`, node);
    }
  }
}
