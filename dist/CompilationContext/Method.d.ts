import CompilationContext from '.';
import binaryen = require('binaryen');
import Statement from './Statement';
declare class Parameter {
    id: number;
    name: string;
    type: binaryen.Type;
    constructor(id: number, name: string, type: binaryen.Type);
}
export default class Method {
    private compilationCtx;
    name?: string;
    parameters: Parameter[];
    statements: Statement[];
    constructor(compilationCtx: CompilationContext);
    getControlFlow(): void;
}
export {};
