import CompilationBuilder from './CompilationBuilder';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Method from './Method';

export default class CompilationDirector {
  builder: CompilationBuilder;
  constructor(builder: CompilationBuilder) {
    this.builder = builder;
  }

  fromNode(node: estree.MethodDefinition) {
    const method = new Method(node, this.builder);
    this.builder.create(method);
  }
}
