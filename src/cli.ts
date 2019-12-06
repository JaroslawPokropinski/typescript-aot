import { CLIEngine } from '@typescript-eslint/experimental-utils/dist/ts-eslint/CLIEngine';
import { exec } from 'child_process';
import fs from 'fs';

function compile(): void {
  // Capture console log data
  const log = console.log;
  let data = '';
  console.log = function(p: { error?: Error; data?: string }) {
    if (p.error) {
      log(`Got error: p.error!`);
      throw p.error;
    }
    if (p.data === undefined) {
      return log(`Error: No data`);
    }
    data = p.data;
  };

  const cli = new CLIEngine({ rules: {'typescript-aot/ts-aot': ['error', true]} });


  try {
    cli.executeOnFiles(["*.ts"]);
    log(data);
  } catch(e) {
    log(`Catched Error ${e}`)
    return;
  }

  try {
    fs.mkdirSync('.temp');
  } catch {}

  fs.writeFile('.temp/out.c', data, (err) => {
    if (err) {
      throw err;
    }
    exec('emcc -O3 -o compiled.wasm .temp/out.c', (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      log(stdout);
      log(stderr);
    });
  });


  // log(JSON.stringify(report));
  

  // const options = JSON.parse(fs.readFileSync('.eslintrc.json', 'utf-8'));
  // options.rules = {
  //   'ts-aot': ['error', true],
  // }
  // log(options);
  // let results = null;
  // try {
  //   results = linter.verify(input, {
  //     parser: 'typescript-parser',
  //     parserOptions: {
  //       project: './tsconfig.json',
  //       ecmaVersion: 2018,
  //       sourceType: 'module',
  //     },
  //     rules: {
  //       'ts-aot': ['error', true],
  //     },
  //   });
  // } catch (error) {
  //   log(`Compilation failed (thrown exception)`);
  //   return log(`Error: ${error}`);
  // }
  console.log = log;
}
compile();
// const dir = process.argv[2];

// if (!dir) {
//   console.error('Usage: node compile.js inDir');
// } else {
//   compile(dir);
// }
