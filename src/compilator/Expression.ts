import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import ParseError from './ParseError';
import Identifier from './ExpressionImpl/Identifier';
import ExpressionVisitor from './ExpressionVisitor';
import BinaryExpression from './ExpressionImpl/BinaryExpression';
import Literal from './ExpressionImpl/Literal';

export default abstract class Expression {
  abstract visit(visitor: ExpressionVisitor): void;

  static fromNode(node: ast.Expression): Expression {
    switch (node.type) {
      case AST_NODE_TYPES.Identifier:
        return new Identifier(node);
      case AST_NODE_TYPES.BinaryExpression:
        return new BinaryExpression(node);
      case AST_NODE_TYPES.Literal:
        return new Literal(node);
      default:
        throw new ParseError('Unknown expression.', node);
    }
  }
}
