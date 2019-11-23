import executeTests from './testUtils';

const testReturnCode = `
import aot, { Int } from './aot';

export default class Myclass {
  @aot
  handleTask(a: Int, b: Int): Int {
    b = a;
    return b;
  }
}
`;

const testAddCode = `
import aot, { Int } from './aot';

export default class Myclass {
  @aot
  handleTask(a: Int, b: Int): Int {
    return a + b;
  }
}
`;

const tests = [
  {
    name: 'Return',
    code: testReturnCode,
    cb: (instance: WebAssembly.Instance) => {
      return instance.exports.handleTask(42, 69) === 42;
    },
  },
  {
    name: 'Add',
    code: testAddCode,
    cb: (instance: WebAssembly.Instance) => {
      return instance.exports.handleTask(42, 69) === 111;
    },
  },
];

executeTests(tests);
