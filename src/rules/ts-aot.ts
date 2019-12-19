import * as util from '../util';
import CompilationDirector from '../compilator/CompilationDirector';
import EmscriptenBuilder from '../Emscripten/EmscriptenBuilder';

var parserServices = null;

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
    schema: [{'type': 'boolean'}],
  },
  defaultOptions: [false],
  create(context, [compile]) {
    // rule implementation here
    parserServices = util.getParserServices(context);
    // const checker = parserServices.program.getTypeChecker();

    const builder = new EmscriptenBuilder();
    const director = new CompilationDirector(parserServices, builder);

    return {
      MethodDefinition(node): void {
        const hasAotDecorator =
          node.decorators &&
          node.decorators.some(
            ({ expression: e }) =>
              e.type === 'CallExpression' &&
              e.callee.type === 'Identifier' &&
              e.callee.name === 'aot'
          );

        if (hasAotDecorator) {
          try {
            director.fromNode(node);
          } catch (e) {
            if (!compile && e.message && e.node) {
              return context.report({
                node: e.node,
                messageId: 'uncompilable',
                data: { reason: e.message },
              });
            }
            if (!compile && !e.message) {
              return context.report({
                node,
                messageId: 'uncompilable',
                data: { reason: 'Unknown.' },
              });
            }
            if (compile) {
              return console.log({ error: e });
            }
            // Unreachable
            return;
          }
          if (compile) {
            const data = builder.getText();
            console.log({ data });
          }
        }
      },
    };
  },
});
