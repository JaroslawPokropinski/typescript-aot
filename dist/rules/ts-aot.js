"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(require("../util"));
const CompilationDirector_1 = __importDefault(require("../compilator/CompilationDirector"));
const LlvmBuilder_1 = __importDefault(require("../compilator/LlvmBuilder"));
exports.default = util.createRule({
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
        const builder = new LlvmBuilder_1.default();
        const director = new CompilationDirector_1.default(builder);
        return {
            MethodDefinition(node) {
                const hasAotDecorator = node.decorators &&
                    node.decorators.some(({ expression: e }) => e.type === 'CallExpression' &&
                        e.callee.type === 'Identifier' &&
                        e.callee.name === 'aot');
                if (hasAotDecorator) {
                    try {
                        director.fromNode(node);
                    }
                    catch (e) {
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
//# sourceMappingURL=ts-aot.js.map