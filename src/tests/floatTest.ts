const floatTestCode = `
import aot, { Float } from './aot';

export default class Myclass {
  @aot()
  handleTask(a: Float, b: Float): Float {
    return a + b;
  }
}
`;

export default [
  {
    name: 'Float',
    code: floatTestCode,
    cb: (instance: WebAssembly.Instance) => {
      return instance.exports.handleTask(42.5, 69.5) === 112.0;
    },
  },
];
