"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loopTestCode = `
import aot, { Float } from './aot';

export default class Myclass {
  @aot()
  handleTask(a: Int, b: Int): Int {
    while (a >= b) {
      a = a - b;
    }
    return a;
  }
}
`;
exports.default = [
    {
        name: 'Loop',
        code: loopTestCode,
        cb: (instance) => {
            return instance.exports.handleTask(42.5, 69.5) === 112.0;
        },
    },
];
//# sourceMappingURL=loopTest.js.map