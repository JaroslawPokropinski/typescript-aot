import * as parser from '@typescript-eslint/parser';
import { Linter } from '@typescript-eslint/experimental-utils/dist/ts-eslint/Linter';
import rule from '../../rules/ts-aot';

function executeTests(
  tests: Array<{
    name: string;
    code: string;
    cb: (data: WebAssembly.Instance) => boolean;
  }>
) {
  // Capture console log data
  const log = console.log;
  let data = new Uint8Array();
  console.log = function(arg: Uint8Array) {
    data = arg;
  };

  const linter = new Linter();

  linter.defineParser('typescript-parser', {
    parse(code, options) {
      const program = parser.parse(code, options as parser.ParserOptions);
      return program;
    },
  });
  linter.defineRule('ts-aot', rule);

  for (let test of tests) {
    log(`Test ${test.name} started.`);
    let results = null;
    try {
      results = linter.verify(test.code, {
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
      log(`${test.name} test failed (thrown exception)`);
      log(error);
      continue;
    }

    if (results && results.length > 0) {
      log(`${test.name} test failed (got linter results)`);
      log('Results: ');
      log(results);
    } else {
      const compiled = new WebAssembly.Module(Buffer.from(data));
      const instance = new WebAssembly.Instance(compiled, {});
      const log2 = console.log;
      console.log = log;
      if (!test.cb(instance)) {
        log(`${test.name} test failed`);
      }
      console.log = log2;
    }
  }

  console.log = log;
}

export default executeTests;
