import compilationTest from './compilationTest';
import floatTest from './floatTest';
import executeTests from './testUtils';
import loopTest from './loopTest';

const tests = [...compilationTest, ...floatTest, ...loopTest];
executeTests(tests);
