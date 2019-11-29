"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Method_1 = __importDefault(require("./Method"));
class CompilationDirector {
    constructor(builder) {
        this.builder = builder;
    }
    fromNode(node) {
        const method = new Method_1.default(node, this.builder);
        this.builder.create(method);
    }
}
exports.default = CompilationDirector;
//# sourceMappingURL=CompilationDirector.js.map