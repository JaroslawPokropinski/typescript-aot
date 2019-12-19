import { CLIEngine } from '@typescript-eslint/experimental-utils/dist/ts-eslint/CLIEngine';
import { exec } from 'child_process';
import fs from 'fs';

function compile(): void {
  // Capture console log data
  const log = console.log;
  let data = '';
  console.log = function(p: { error?: Error; data?: string }) {
    if (p.error) {
      log(`Got error: ${p.error}!`);
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

  fs.writeFile('.temp/out.cpp', data, (err) => {
    if (err) {
      throw err;
    }
    exec('em++ -std=c++14 --bind -o compiled.js .temp/out.cpp', (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      log(stdout);
      log(stderr);
    });
  });
  console.log = log;
}
compile();