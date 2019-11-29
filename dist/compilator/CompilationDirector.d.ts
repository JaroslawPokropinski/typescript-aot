import CompilationBuilder from './CompilationBuilder';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
export default class CompilationDirector {
    builder: CompilationBuilder;
    constructor(builder: CompilationBuilder);
    fromNode(node: estree.MethodDefinition): void;
}
