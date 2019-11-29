"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function aot(dir) {
    return function (_target, propertyName, propertyDesciptor) {
        const newDir = dir.replace(/\.[^/.]+$/, '.wasm');
        const binData = fs_1.default.readFileSync(newDir);
        const compiled = new WebAssembly.Module(binData);
        const instance = new WebAssembly.Instance(compiled, {});
        propertyDesciptor.value = function (...args) {
            return instance.exports[propertyName](...args);
        };
    };
}
exports.default = aot;
//# sourceMappingURL=aot.js.map