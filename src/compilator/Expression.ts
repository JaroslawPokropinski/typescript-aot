import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import ParseError from './ParseError';
import Identifier from './ExpressionImpl/Identifier';
import ExpressionVisitor from './ExpressionVisitor';
import BinaryExpression from './ExpressionImpl/BinaryExpression';
import Literal from './ExpressionImpl/Literal';
import NewExpression from './ExpressionImpl/NewExpression';
import CallExpression from './ExpressionImpl/CallExpression';
import CompilationDirector from './CompilationDirector';

export default abstract class Expression {
  abstract visit(visitor: ExpressionVisitor): void;

  static fromNode(node: ast.Expression, director: CompilationDirector): Expression {
    switch (node.type) {
      case AST_NODE_TYPES.Identifier:
        return new Identifier(node, director);
      case AST_NODE_TYPES.BinaryExpression:
        return new BinaryExpression(node, director);
      case AST_NODE_TYPES.Literal:
        return new Literal(node, director);
      case AST_NODE_TYPES.NewExpression:
        return new NewExpression(node, director);
      case AST_NODE_TYPES.CallExpression:
          return new CallExpression(node, director);
      default:
        throw new ParseError(`Unknown expression "${node.type}".`, node);
    }
  }
}
