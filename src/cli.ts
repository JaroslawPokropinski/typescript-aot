import { CLIEngine } from '@typescript-eslint/experimental-utils/dist/ts-eslint/CLIEngine';

function compile(): void {
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

  // const input = fs.readFileSync(dir, 'utf8');

  // const linter = new Linter();
  const cli = new CLIEngine({ rules: {'typescript-aot/ts-aot': ['error', true]} });


  // linter.defineParser('typescript-parser', {
  //   parse(code, options) {
  //     const program = parser.parse(code, options as parser.ParserOptions);
  //     return program;
  //   },
  // });
  // linter.defineRule('ts-aot', rule);

  try {
    cli.executeOnFiles(["*.ts"]);
    log(data);
  } catch(e) {
    log(`Catched Error ${e}`)
  }
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
