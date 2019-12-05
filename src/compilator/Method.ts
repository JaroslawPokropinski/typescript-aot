import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import ParseError from './ParseError';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import Statement from './Statement';
import CompilationDirector from './CompilationDirector';

function getParameterInfo(
  parameter: estree.Parameter
): { name: estree.Identifier; typeName: estree.Identifier } {
  if (parameter.type !== 'Identifier') {
    throw new ParseError('Parameter must be Identifier.', parameter);
  }

  if (parameter.typeAnnotation === undefined) {
    throw new ParseError('Parameter must have type annotation.', parameter);
  }

  if (parameter.typeAnnotation.typeAnnotation.type !== 'TSTypeReference') {
    throw new ParseError(
      'Parameter type annotation must be type reference.',
      parameter
    );
  }

  if (parameter.typeAnnotation.typeAnnotation.typeName.type !== 'Identifier') {
    throw new ParseError('Parameter type name must be Identifier.', parameter);
  }
  return {
    name: parameter,
    typeName: parameter.typeAnnotation.typeAnnotation.typeName,
  };
}

export default class Method {
  name: string;
  statements = Array<Statement>();
  parameters = Array<{
    name: estree.Identifier;
    typeName: estree.Identifier;
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
      this.parameters.push(getParameterInfo(parameter));
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
