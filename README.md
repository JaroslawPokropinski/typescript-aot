# typescript-aot

[WIP] Ahead of time compilation of methods in Typescript

## Installation
Please note that you need to have emscripten installed and in path. To verify use: `emcc -v`.


```
npm i -D JaroslawPokropinski/typescript-aot
```

## Usage

Write a file with aot decorator

```
import aot, { Int } from 'eslint-plugin-typescript-aot/dist/aot';
import path from 'path';

export default class Myclass {
  @aot(path.join(__dirname, 'compiled.wasm'))
  handleTask(a: Float, b: Float): Float {
    let r: Float = new Float(0);
    while (a >= b) {
      a = a - b;
      r = r + new Float(1);
    }
    return r;
  }
}
```

Compile

```
node eslint-plugin-typescript-aot\dist\cli.js
```

Eslint integration:

```
"plugins": [..., "typescript-aot"],
  "rules": {
    ...,
    "typescript-aot/ts-aot": 2
  }
```
