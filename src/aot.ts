import fs from 'fs';

export default function aot(dir: string) {
  return function(
    _target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
  ) {
    const newDir = dir.replace(/\.[^/.]+$/, '.wasm');
    const binData = fs.readFileSync(newDir);
    const compiled = new WebAssembly.Module(binData);
    const instance = new WebAssembly.Instance(compiled, {});

    propertyDesciptor.value = function(...args: any[]) {
      return instance.exports[propertyName](...args);
    };
  };
}

export type Int = number;
export type Float = number;