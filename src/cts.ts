import * as parser from '@typescript-eslint/parser';
import { Linter } from '@typescript-eslint/experimental-utils/dist/ts-eslint/Linter';
import rule from './rules/ts-aot';
import fs from 'fs';
import { exec } from 'child_process';

function compile(dir: string): void {
  // Capture console log data
  const log = console.log;
  let data = '';
  console.log = function(p: { error?: Error; data?: string }) {
    if (p.error) {
      throw p.error;
    }
    if (p.data === undefined) {
      return log(`Error: No data`);
    }
    data = p.data;
  };

  const input = fs.readFileSync(dir, 'utf8');

  const linter = new Linter();

  linter.defineParser('typescript-parser', {
    parse(code, options) {
      const program = parser.parse(code, options as parser.ParserOptions);
      return program;
    },
  });
  linter.defineRule('ts-aot', rule);

  const options = JSON.parse(fs.readFileSync('.eslintrc.json', 'utf-8'));
  options.rules = {
    'ts-aot': ['error', true],
  }
  log(options);
  let results = null;
  try {
    results = linter.verify(input, {
      parser: 'typescript-parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      rules: {
        'ts-aot': ['error', true],
      },
    });
  } catch (error) {
    log(`Compilation failed (thrown exception)`);
    return log(`Error: ${error}`);
  }

  if (results && results.length > 0) {
    log('Results: ');
    log(results);
    return;
  } else {
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
  }

  console.log = log;
}

const dir = process.argv[2];

if (!dir) {
  console.error('Usage: node compile.js inDir');
} else {
  compile(dir);
}
