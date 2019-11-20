import { createRule } from '../util';
import fs from 'fs';

export default createRule({
  name: 'ts-aot',
  meta: {
    type: 'problem',
    docs: {
      description: 'Check if code is compilable.',
      category: 'Possible Errors',
      recommended: 'error',
    },
    messages: {
      uncompilable: 'Failed to process aot code.',
    },
    schema: [],
  },
  defaultOptions: [
    // fill our your rule's default options here
  ],
  create(context, _defaultOptions) {
    // rule implementation here
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
            if (!node.value.id) {
              return context.report({ node, messageId: 'uncompilable' });
            }
            const str = node.value.id.name;

            fs.open('C:/out.txt', 'w', (err, fd) => {
              if (err) throw err;
              fs.write(fd, str, (err) => {
                if (err) throw err;
                fs.close(fd, (err) => {
                  if (err) throw err;
                });
              });
            });
          }
        }
      },
    };
  },
});
