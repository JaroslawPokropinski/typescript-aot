"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
exports.default = util_1.createRule({
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
            MethodDefinition(node) {
                if (node.decorators) {
                    const decorators = node.decorators;
                    let shouldCompile = false;
                    for (let i = 0; i < decorators.length; i++) {
                        const expression = decorators[i].expression;
                        if (expression.type === 'Identifier' && expression.name === 'aot') {
                            shouldCompile = true;
                        }
                    }
                    if (shouldCompile) {
                        context.report({ node, messageId: 'uncompilable' });
                    }
                }
            },
        };
    },
});
//# sourceMappingURL=ts-aot.js.map