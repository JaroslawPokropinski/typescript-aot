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
const ts_aot_1 = __importDefault(require("../../rules/ts-aot"));
function executeTests(tests) {
    // Capture console log data
    const log = console.log;
    let data = new Uint8Array();
    console.log = function (arg) {
        data = arg;
    };
    const linter = new Linter_1.Linter();
    linter.defineParser('typescript-parser', {
        parse(code, options) {
            const program = parser.parse(code, options);
            return program;
        },
    });
    linter.defineRule('ts-aot', ts_aot_1.default);
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
        }
        catch (error) {
            log(`${test.name} test failed (thrown exception)`);
            log(error);
            continue;
        }
        if (results && results.length > 0) {
            log(`${test.name} test failed (got linter results)`);
            log('Results: ');
            log(results);
        }
        else {
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
exports.default = executeTests;
//# sourceMappingURL=index.js.map