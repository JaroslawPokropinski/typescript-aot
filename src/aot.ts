import path from 'path';
import fs from 'fs';

export default function aot(
  _target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor
) {
  if (require.main === undefined) {
    throw Error('No main file');
  }
  const p = path.dirname(require.main.filename);
  const binData = fs.readFileSync(path.join(p, 'wasm.wasm'));
  const compiled = new WebAssembly.Module(binData);
  const instance = new WebAssembly.Instance(compiled, {});

  propertyDesciptor.value = function(...args: any[]) {
    return instance.exports[propertyName](...args);
  };
}

export type Int = number;
export type Float = number;
