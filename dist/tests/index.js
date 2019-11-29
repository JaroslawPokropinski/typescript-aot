"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compilationTest_1 = __importDefault(require("./compilationTest"));
const floatTest_1 = __importDefault(require("./floatTest"));
const testUtils_1 = __importDefault(require("./testUtils"));
const loopTest_1 = __importDefault(require("./loopTest"));
const tests = [...compilationTest_1.default, ...floatTest_1.default, ...loopTest_1.default];
testUtils_1.default(tests);
//# sourceMappingURL=index.js.map