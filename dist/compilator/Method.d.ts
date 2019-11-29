import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import CompilationBuilder from './CompilationBuilder';
import Statement from './Statement';
export default class Method {
    name: string;
    statements: Statement[];
    parameters: {
        name: estree.Identifier;
        typeName: estree.Identifier;
    }[];
    returnTypeName?: string;
    constructor(node: estree.MethodDefinition, builder: CompilationBuilder);
    process(): any;
}
