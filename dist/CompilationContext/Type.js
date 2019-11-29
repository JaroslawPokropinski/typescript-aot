"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binaryen = require("binaryen");
class Type {
    constructor(type) {
        this.type = type;
    }
    getOperations(mod) {
        switch (this.type) {
            case binaryen.i32:
                return mod.i32;
            case binaryen.f32:
                return mod.f32;
            case binaryen.f64:
                return mod.f64;
            default:
                throw new Error('Unknown type');
        }
    }
}
exports.default = Type;
//# sourceMappingURL=Type.js.map