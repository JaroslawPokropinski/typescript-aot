"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const fs_1 = __importDefault(require("fs"));
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
                        fs_1.default.open('C:/out.txt', 'w', (err, fd) => {
                            if (err)
                                throw err;
                            fs_1.default.write(fd, str, (err) => {
                                if (err)
                                    throw err;
                                fs_1.default.close(fd, (err) => {
                                    if (err)
                                        throw err;
                                });
                            });
                        });
                    }
                }
            },
        };
    },
});
//# sourceMappingURL=ts-aot.js.map