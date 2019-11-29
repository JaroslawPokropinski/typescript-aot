import Method from './Method';
import binaryen from 'binaryen';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Statement from './Statement';
import Expression from './Expression';
declare class Parameter {
    id: number;
    name: string;
    type: binaryen.Type;
    local: boolean;
    constructor(id: number, name: string, type: binaryen.Type, local: boolean);
    getSize(): number;
}
declare type VarScope = {
    prev: VarScope | null;
    variables: Map<string, Parameter>;
};
export default class CompilationContext {
    methods: Array<Method>;
    bmodule: binaryen.Module;
    localVariables: Map<string, Parameter>;
    localVariableIndex: number;
    returnType: binaryen.Type;
    setReturn(name: string): void;
    addParameter(name: string, type: binaryen.Type): void;
    variableScope: VarScope;
    variableIndex: number;
    addVariable(name: string, type: binaryen.Type): void;
    findVariable(name: string): Parameter;
    getVariable(name: string): number;
    setVariable(name: string, value: number): number;
    addMethod(method: Method): void;
    static getBinType(type: string): binaryen.Type;
    getStatement(estStatement: estree.Statement): Statement | null;
    getExpression(estExpression: estree.Expression): Expression | null;
}
export { Method };
