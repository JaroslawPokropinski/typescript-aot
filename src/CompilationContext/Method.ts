import CompilationContext from '.';
import binaryen = require('binaryen');
import Statement from './Statement';

class Parameter {
  id: number;
  name: string;
  type: binaryen.Type;

  constructor(id: number, name: string, type: binaryen.Type) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}

export default class Method {
  name?: string;
  parameters = Array<Parameter>();
  statements = Array<Statement>();

  constructor(private compilationCtx: CompilationContext) {}

  getControlFlow() {
    if (!this.name) {
      throw new Error('No anonymous methods allowed');
    }
    const bmodule = this.compilationCtx.bmodule;

    bmodule.addFunction(
      this.name,
      bmodule.addFunctionType(
        'iii',
        binaryen.i32,
        Array.from(this.compilationCtx.localVariables.values()).map(
          (p) => p.type
        )
      ),
      [],
      bmodule.block(
        'block',
        this.statements.map((st) => st.getControlFlow())
      )
    );
    bmodule.addFunctionExport(this.name, this.name);
  }
}

Method.prototype.toString = function methodToString() {
  let stringBuilder = Array<string>();
  if (this.name) {
    stringBuilder.push(this.name);
  }
  for (let i = 0; i < this.parameters.length; i++) {
    const parameter = this.parameters[i];
    stringBuilder.push(`${parameter.name}: ${parameter.type}`);
  }
  return stringBuilder.join('\n');
};
