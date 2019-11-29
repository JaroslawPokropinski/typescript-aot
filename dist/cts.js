"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser = __importStar(require("@typescript-eslint/parser"));
const Linter_1 = require("@typescript-eslint/experimental-utils/dist/ts-eslint/Linter");
const ts_aot_1 = __importDefault(require("./rules/ts-aot"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
function compile(dir) {
    // Capture console log data
    const log = console.log;
    let data = '';
    console.log = function (p) {
        if (p.error) {
            return log(`Error: ${p.error}`);
        }
        if (p.data === undefined) {
            return log(`Error: No data`);
        }
        data = p.data;
    };
    const input = fs_1.default.readFileSync(dir, 'utf8');
    const linter = new Linter_1.Linter();
    linter.defineParser('typescript-parser', {
        parse(code, options) {
            const program = parser.parse(code, options);
            return program;
        },
    });
    linter.defineRule('ts-aot', ts_aot_1.default);
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
    }
    catch (error) {
        log(`Compilation failed (thrown exception)`);
        log(error);
        return;
    }
    if (results && results.length > 0) {
        log('Results: ');
        log(results);
    }
    else {
        try {
            fs_1.default.mkdirSync('.temp');
        }
        catch (_a) { }
        fs_1.default.writeFile('.temp/out.c', data, (err) => {
            if (err) {
                throw err;
            }
            child_process_1.exec('emcc -Os -o compiled.wasm .temp/out.c', (error, stdout, stderr) => {
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
}
else {
    compile(dir);
}
//# sourceMappingURL=cts.js.map