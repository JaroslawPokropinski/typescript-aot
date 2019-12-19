# typescript-aot

[WIP] Ahead of time compilation of methods in Typescript

## Installation
Please note that you need to have emscripten installed and in path. To verify use: `em++ -v`.


```
npm i -D JaroslawPokropinski/typescript-aot
```

## Usage

Write a file with aot decorator

```
import aot, { Int, Float, CArray, loadModule } from 'eslint-plugin-typescript-aot/dist/aot';

const Module = loadModule(require('./compiled.js'));

class Myclass {
  @aot(Module)
  handleMax(a: CArray<Float>, n: Int): Float {
    let max = a.get(new Int(0));
    let i = new Int(0);
    while (i.lt(n)) {
      if(a.get(i).gt(max)) {
        max = a.get(i);
      }
      i = i.add(new Int(1));
    }
    return max;
  }
}

function main() {
  const obj = new Myclass();
  const floats = Module.createFloatArray();
  floats.push(new Float(-3.0));
  floats.push(new Float(1.0));
  floats.push(new Float(-5.0));

  console.log(obj.handleMax(floats, floats.size()));
}

Module.onLoad(() => main());
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
