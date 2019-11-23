import * as parser from '@typescript-eslint/parser';
import { Linter } from '@typescript-eslint/experimental-utils/dist/ts-eslint/Linter';
import rule from './rules/ts-aot';
import fs from 'fs';

function compile(dir: string, outDir: string): void {
  // Capture console log data
  const log = console.log;
  let data = new Uint8Array();
  console.log = function(arg: Uint8Array) {
    data = arg;
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

  let results = null;
  try {
    results = linter.verify(input, {
      parser: 'typescript-parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      rules: {
        'ts-aot': ['error', true],
      },
    });
  } catch (error) {
    log(`Compilation failed (thrown exception)`);
    log(error);
    return;
  }

  if (results && results.length > 0) {
    log('Results: ');
    log(results);
  } else {
    fs.writeFileSync(outDir, data);
  }

  console.log = log;
}

const dir = process.argv[2];
const outDir = process.argv[3];

if (!dir || !outDir) {
  console.error('Usage: node compile.js inDir outDir');
} else {
  compile(dir, outDir);
}
