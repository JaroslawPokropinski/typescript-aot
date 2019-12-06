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

export default [
  {
    name: 'Loop',
    code: loopTestCode,
    cb: (instance: WebAssembly.Instance) => {
      const handleTask = instance.exports.handleTask as (a: number, b: number) => number;
      return handleTask(42.5, 69.5) === 112.0;
    },
  },
];
