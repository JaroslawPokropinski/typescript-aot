import * as util from '../util';
import CompilationContext, { Method } from '../CompilationContext';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Statement from '../CompilationContext/Statement';

function getParameterType(
  parameter: estree.Parameter
): estree.Identifier | null {
  if (parameter.type !== 'Identifier') {
    return null;
  }

  if (parameter.typeAnnotation === undefined) {
    return null;
  }

  if (parameter.typeAnnotation.typeAnnotation.type !== 'TSTypeReference') {
    return null;
  }

  if (parameter.typeAnnotation.typeAnnotation.typeName.type !== 'Identifier') {
    return null;
  }

  return parameter.typeAnnotation.typeAnnotation.typeName;
}

function processStatement(
  ctx: CompilationContext,
  statement: estree.Statement
): Statement | null {
  return ctx.getStatement(statement);
}

export default util.createRule({
  name: 'ts-aot',
  meta: {
    type: 'problem',
    docs: {
      description: 'Check if code is compilable.',
      category: 'Possible Errors',
      recommended: 'error',
    },
    messages: {
      uncompilable: 'Failed to process aot code: {{ reason }}',
    },
    schema: [],
  },
  defaultOptions: [false],
  create(context, [compile]) {
    // rule implementation here
    const compilationCtx = new CompilationContext();

    return {
      MethodDefinition(node): void {
        if (node.decorators) {
          const decorators = node.decorators;
          let hasAotDecorator = false;
          for (let i = 0; i < decorators.length; i++) {
            const expression = decorators[i].expression;
            if (expression.type === 'Identifier' && expression.name === 'aot') {
              hasAotDecorator = true;
            }
          }

          if (hasAotDecorator) {
            const method = new Method(compilationCtx);
            if (node.key.type !== 'Identifier') {
              return context.report({
                node,
                messageId: 'uncompilable',
                data: { reason: 'Method key must be Identifier' },
              });
            }

            method.name = node.key.name;
            if (node.value.type !== 'FunctionExpression') {
              return context.report({
                node,
                messageId: 'uncompilable',
                data: { reason: 'Method must be FunctionExpression' },
              });
            }

            const parameters = node.value.params;

            for (let i = 0; i < parameters.length; i++) {
              const parameter = parameters[i];

              if (parameter.type !== 'Identifier') {
                return context.report({
                  node,
                  messageId: 'uncompilable',
                  data: { reason: 'Parameters must be Identifiers' },
                });
              }
              // TODO: validate variable

              let type = getParameterType(parameter);
              if (type === null) {
                return context.report({
                  node,
                  messageId: 'uncompilable',
                  data: { reason: 'Cannot get parameter type' },
                });
              }

              compilationCtx.addParameter(
                parameter.name,
                CompilationContext.getBinType(type.name)
              );
            }
            // TODO: return type

            if (!node.value.body) {
              return context.report({
                node,
                messageId: 'uncompilable',
                data: { reason: 'Unexpected empty body' },
              });
            }

            const statements = node.value.body.body;

            for (let i = 0; i < statements.length; i++) {
              const astStatement = statements[i];
              const statement = processStatement(compilationCtx, astStatement);
              if (statement === null) {
                return context.report({
                  node,
                  messageId: 'uncompilable',
                  data: {
                    reason: `Unexpected statement: ${astStatement.type}`,
                  },
                });
              } else {
                method.statements.push(statement);
              }
            }
            try {
              method.getControlFlow();
            } catch (e) {
              return context.report({
                node,
                messageId: 'uncompilable',
                data: { reason: e.message },
              });
            }

            if (!compilationCtx.bmodule.validate()) {
              return context.report({
                node,
                messageId: 'uncompilable',
                data: { reason: 'Validation failed' },
              });
            }

            if (compile) {
              compilationCtx.bmodule.optimize();
              console.log(compilationCtx.bmodule.emitBinary());
            }
          }
        }
      },
    };
  },
});
