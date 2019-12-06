import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import CompilationDirector from '../CompilationDirector';
// import ParseError from '../ParseError';

// interface _CallExpression extends Expression {}

// class VariableOperation implements _CallExpression {

//   constructor()

//   visit(visitor: ExpressionVisitor): void {
//     throw new Error("Method not implemented.");
//   }

// }

export default class CallExpression implements Expression {
  operator: string = '';
  left: Expression;
  right: Expression;

  
  constructor(ast: ast.CallExpression, director: CompilationDirector) {
    if (ast.callee.type === AST_NODE_TYPES.MemberExpression) {
        // Get type of ast.callee.object
        // if INT or FLOAT and ast.callee.property add then perform addition
        const type = director.getTsType(ast.callee.object);
        const symbol = type.getSymbol();
        if (symbol && (symbol.name === 'Float' || symbol.name === 'Int') && ast.callee.property.type === AST_NODE_TYPES.Identifier && ast.arguments.length === 1) {
          switch(ast.callee.property.name) {
            case 'add':
              this.operator = '+';
              break;
            case 'sub':
              this.operator = '-';
              break;
            case 'mul':
              this.operator = '*';
              break;
            case 'div':
              this.operator = '/';
              break;
            case 'ge':
              this.operator = '>=';
              break;
            case 'le':
              this.operator = '<=';
              break;
            case 'gt':
              this.operator = '>';
              break;
            case 'lt':
              this.operator = '<';
              break;
            default:
              throw new Error('Thats not fine (in CallExpression case)');
          }
          this.left = Expression.fromNode(ast.callee.object, director);
          this.right = Expression.fromNode(ast.arguments[0], director);
          return;
        }
        
        throw new Error('Thats not fine (in CallExpression)');
    }
    throw new Error('Expected member expression');
  }

  visit(visitor: ExpressionVisitor): void {
    visitor.onCall(this);
  }
}
