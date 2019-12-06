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
import aot, { Float } from 'eslint-plugin-typescript-aot/dist/aot';
import path from 'path';

class Myclass {
  @aot(path.join(__dirname, 'compiled.wasm'))
  handleTask(a: Float, b: Float): Float {
    let r: Float = new Float(0);
    while (a.ge(b)) {
      a = a.sub(b);
      r = r.add(new Float(1));
    }
    return r;
  }
}
```

Compile

```
node eslint-plugin-typescript-aot\dist\cli.js
```

.eslintrc.json:

```
{
  "env": {
    "browser": true,
    "es6": true
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "typescript-aot"],
  "rules": {
    "typescript-aot/ts-aot": ["warn"]
  }
}

```
