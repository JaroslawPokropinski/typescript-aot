"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const floatTestCode = `
import aot, { Float } from './aot';

export default class Myclass {
  @aot()
  handleTask(a: Float, b: Float): Float {
    return a + b;
  }
}
`;
exports.default = [
    {
        name: 'Float',
        code: floatTestCode,
        cb: (instance) => {
            return instance.exports.handleTask(42.5, 69.5) === 112.0;
        },
    },
];
//# sourceMappingURL=floatTest.js.map