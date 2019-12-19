import CompilationBuilder from './CompilationBuilder';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import Method from './Method';
import * as util from '../util';
import ts from 'typescript';


type RequiredParserServices = ReturnType<typeof util.getParserServices>;

export default class CompilationDirector {
  builder: CompilationBuilder;
  parserServices: RequiredParserServices
  checker: ts.TypeChecker;
  
  constructor(parserServices: RequiredParserServices, builder: CompilationBuilder) {
    this.builder = builder;
    this.parserServices = parserServices;
    this.checker = parserServices.program.getTypeChecker();
  }

  fromNode(node: estree.MethodDefinition) {
    const method = new Method(node, this);
    this.builder.create(method);
  }

  getTsType(node: estree.Node): ts.Type {
    const originalNode = this.parserServices.esTreeNodeToTSNodeMap.get(node);
    return this.checker.getTypeAtLocation(originalNode);
  }
}
