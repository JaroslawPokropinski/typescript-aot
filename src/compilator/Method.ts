import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import ParseError from './ParseError';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import Statement from './Statement';
import CompilationDirector from './CompilationDirector';

// function getParameterInfo(
//   parameter: estree.Parameter
// ): { name: estree.Identifier; typeName: estree.Identifier } {
//   if (parameter.type !== 'Identifier') {
//     throw new ParseError('Parameter must be Identifier.', parameter);
//   }

//   if (parameter.typeAnnotation === undefined) {
//     throw new ParseError('Parameter must have type annotation.', parameter);
//   }

//   if (parameter.typeAnnotation.typeAnnotation.type !== 'TSTypeReference') {
//     throw new ParseError(
//       'Parameter type annotation must be type reference.',
//       parameter
//     );
//   }

//   if (parameter.typeAnnotation.typeAnnotation.typeName.type !== 'Identifier') {
//     throw new ParseError('Parameter type name must be Identifier.', parameter);
//   }
//   return {
//     name: parameter,
//     typeName: parameter.typeAnnotation.typeAnnotation.typeName,
//   };
// }

function getParameterInfo(
  parameter: estree.Parameter,
  director: CompilationDirector,
): { name: estree.Identifier; typeName: string, typeArguments?: Array<string> } {

  if (parameter.type !== 'Identifier') {
    throw new ParseError('Parameter must be Identifier.', parameter);
  }
  const tsType = director.getTsType(parameter);
  let typeArguments: Array<string> | undefined = undefined;
  
  if (parameter?.typeAnnotation?.typeAnnotation?.type === 'TSTypeReference') {
    if (parameter.typeAnnotation.typeAnnotation.typeParameters) {
      parameter.typeAnnotation.typeAnnotation.typeParameters.params.forEach((p)=> {
        if (p.type !== AST_NODE_TYPES.TSTypeReference || p.typeName.type !== AST_NODE_TYPES.Identifier) {
          throw new ParseError('Generic parameter error', p);
        }
        if (!typeArguments) {
          typeArguments = new Array<string>();
        }
        typeArguments.push(p.typeName.name);        
      })
    }
    
  }
  
  // if (tsType.target && tsType.target.typeParameters) {
  //   // console.error('isTypeParameter', tsType.symbol.name);
  //   const t: ts.Type[] = tsType.target.typeParameters;

  //   typeArguments = t.map((tp) => {
  //     return tp.name;
  //   })
    
  // }

  return {
    name: parameter,
    typeName: tsType.symbol.name,
    typeArguments: typeArguments
  };

}

export default class Method {
  name: string;
  statements = Array<Statement>();
  parameters = Array<{
    name: estree.Identifier;
    typeName: string;
    typeArguments?: Array<string>;
  }>();
  returnTypeName?: string;
  constructor(node: estree.MethodDefinition, director: CompilationDirector) {
    if (node.key.type !== 'Identifier') {
      throw new ParseError('Method key must be Identifier', node);
    }

    this.name = node.key.name;

    if (node.value.type !== 'FunctionExpression') {
      throw new ParseError('Method must be FunctionExpression', node);
    }

    const parameters = node.value.params;

    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i];
      this.parameters.push(getParameterInfo(parameter, director));
    }

    if (node.value.returnType) {
      const retTA = node.value.returnType.typeAnnotation;
      if (
        retTA.type !== AST_NODE_TYPES.TSTypeReference ||
        retTA.typeName.type !== AST_NODE_TYPES.Identifier
      ) {
        throw new ParseError('Cannot get return type', node);
      }
      this.returnTypeName = retTA.typeName.name;
    }

    if (!node.value.body) {
      throw new ParseError('Unexpected empty body', node.value);
    }

    const astStatements = node.value.body.body;

    for (let i = 0; i < astStatements.length; i++) {
      const astStatement = astStatements[i];
      const statement = Statement.fromNode(astStatement, director);
      this.statements.push(statement);
    }
  }
  process(): any {}
}

Method.prototype.toString = function() {
  return `name: ${this.name}, statements: ${this.statements}`;
};
