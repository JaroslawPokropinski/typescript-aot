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

export default [
  {
    name: 'Return',
    code: testReturnCode,
    cb: (instance: WebAssembly.Instance) => {
      const handleTask = instance.exports.handleTask as (a: number, b: number) => number;
      return handleTask(42, 69) === 42;
    },
  },
  {
    name: 'Add',
    code: testAddCode,
    cb: (instance: WebAssembly.Instance) => {
      const handleTask = instance.exports.handleTask as (a: number, b: number) => number;
      return handleTask(42, 69) === 111;
    },
  },
];
