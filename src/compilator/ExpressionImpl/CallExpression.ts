import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Expression from '../Expression';
import ExpressionVisitor from '../ExpressionVisitor';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import CompilationDirector from '../CompilationDirector';
// import ParseError from '../ParseError';


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
        if (symbol && symbol.name === 'Float' && ast.callee.property.type === AST_NODE_TYPES.Identifier && ast.arguments.length === 1) {
          switch(ast.callee.property.name) {
            case 'add':
              this.operator = '+';
              break;
            case 'ge':
              this.operator = '>=';
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
