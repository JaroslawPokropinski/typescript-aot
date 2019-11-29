"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testReturnCode = `
import aot, { Int } from './aot';

export default class Myclass {
  @aot()
  handleTask(a: Int, b: Int): Int {
    b = a;
    return b;
  }
}
`;
const testAddCode = `import aot, { Int } from './aot';

export default class Myclass {
  @aot()
  handleTask(a: Int, b: Int): Int {
    return a + b;
  }
}

const obj = new Myclass();

const r = obj.handleTask(12, 13);
obj.handleTask(42, 69);
console.log(r);
`;
exports.default = [
    {
        name: 'Return',
        code: testReturnCode,
        cb: (instance) => {
            return instance.exports.handleTask(42, 69) === 42;
        },
    },
    {
        name: 'Add',
        code: testAddCode,
        cb: (instance) => {
            return instance.exports.handleTask(42, 69) === 111;
        },
    },
];
//# sourceMappingURL=compilationTest.js.map