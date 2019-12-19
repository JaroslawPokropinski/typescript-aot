import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import CompilationDirector from '../CompilationDirector';
import TypeUtil from '../TypeUtil';
import ParseError from '../ParseError';
import BinaryExpression from './BinaryExpression';
// import ParseError from '../ParseError';

// interface _CallExpression extends Expression {}

// class VariableOperation implements _CallExpression {

//   constructor()

//   visit(visitor: ExpressionVisitor): void {
//     throw new Error("Method not implemented.");
//   }

// }

const ifBinaryExpression = (name: string): string | null => {
  switch(name) {
    case 'add':
      return '+';
    case 'sub':
        return '-';
      case 'mul':
        return '*';
      case 'div':
        return '/';
      case 'ge':
        return '>=';
      case 'le':
        return '<=';
      case 'gt':
        return '>';
      case 'lt':
        return '<';
      default:
        return null;
  }
}

export default class CallExpression implements Expression {
  builtin?: { visit: (visitor: ExpressionVisitor) => void };
  
  constructor(ast: ast.CallExpression, director: CompilationDirector) {
    if (ast.callee.type === AST_NODE_TYPES.MemberExpression) {
        // Get type of ast.callee.object
        // if INT or FLOAT and ast.callee.property add then perform addition
        const type = director.getTsType(ast.callee.object);
        const symbol = type.getSymbol();
        if (symbol && TypeUtil.isBuiltinType(symbol.name)) {
          if (ast.callee.property.type !== AST_NODE_TYPES.Identifier) {
            throw new ParseError("Builtin method error", ast);
          }
          const obj = ast.callee.object;
          const op = ifBinaryExpression(ast.callee.property.name);
          if (op) {
            this.builtin = { visit: (visitor) => visitor.onBinary(BinaryExpression.create(
              Expression.fromNode(obj, director),
              Expression.fromNode(ast.arguments[0], director),
              op
              )
            )}
            return;
          };

          switch(ast.callee.property.name) {
            case 'get':
              return this.builtin = { visit: (visitor) => {
                visitor.onGet({
                  left: Expression.fromNode(obj, director),
                  index: Expression.fromNode(ast.arguments[0], director),
                });
              }};
              
            default:
              throw new ParseError('Thats not fine (in CallExpression case), operator: ' + ast.callee.property.name, ast);
          }
        }        
        throw new ParseError('Thats not fine (in CallExpression)', ast);
    }
    throw new Error('Expected member expression');
  }

  visit(visitor: ExpressionVisitor): void {
    if (this.builtin) {
      return this.builtin.visit(visitor);
    }
    visitor.onCall(this);
  }
}
