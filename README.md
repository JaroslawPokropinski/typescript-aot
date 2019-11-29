# typescript-aot
[WIP] Ahead of time compilation of methods in Typescript

## Installation
```
npm i -D JaroslawPokropinski/typescript-aot
```

## Usage
Write a file with aot decorator
```
import aot, { Int } from 'eslint-plugin-typescript-aot/dist/aot';

export default class Myclass {
  @aot(__filename)
  handleTask(a: Int, b: Int): Int {
    let r: Int = 0;
    while (a >= b) {
      a = a - b;
      r = r + 1;
    }
    return r;
  }
}
```
Compile
```
node eslint-plugin-typescript-aot\dist\cts.js index.ts
```