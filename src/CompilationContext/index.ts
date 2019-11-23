import Method from './Method';
import binaryen from 'binaryen';
import * as estree from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import Statement from './Statement';
import ReturnStatement from './Statement/ReturnStatement';
import Expression from './Expression';
import Identifier from './Expression/Identifer';
import AssignmentStatement from './Statement/AssignmentStatement';
import BinaryExpression from './Expression/BinaryExpression';

class Parameter {
  id: number;
  name: string;
  type: binaryen.Type;
  local: boolean;

  constructor(id: number, name: string, type: binaryen.Type, local: boolean) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.local = local;
  }

  getSize(): number {
    switch (this.type) {
      case binaryen.i32:
        return 1;
      case binaryen.i64:
        return 2;
      case binaryen.f32:
        return 1;
      case binaryen.f64:
        return 2;
      default:
        throw new Error('Unknown type');
    }
  }
}

type VarScope = { prev: VarScope | null; variables: Map<string, Parameter> };

export default class CompilationContext {
  methods: Array<Method> = [];

  bmodule = new binaryen.Module();

  localVariables = new Map<string, Parameter>();
  localVariableIndex = 0;

  addParameter(name: string, type: binaryen.Type) {
    if (this.localVariables.has(name)) {
      throw new Error('Variable already declared!');
    }
    const p = new Parameter(this.localVariableIndex, name, type, true);
    this.localVariableIndex++;
    this.localVariables.set(name, p);
  }

  variableScope: VarScope = {
    prev: null,
    variables: new Map<string, Parameter>(),
  };
  variableIndex = 0;

  addVariable(name: string, type: binaryen.Type) {
    if (this.variableScope.variables.has(name)) {
      throw new Error('Variable already declared!');
    }
    const p = new Parameter(this.variableIndex, name, type, false);
    this.variableIndex += p.getSize();
    this.variableScope.variables.set(name, p);
  }

  findVariable(name: string): Parameter {
    let scope: VarScope | null = this.variableScope;
    // find variable in memory
    while (scope !== null) {
      if (scope.variables.has(name)) {
        const p = scope.variables.get(name);
        if (p === undefined) {
          throw new Error('Unexpected error');
        }
        return p;
      }
      scope = scope.prev;
    }
    // find variable in local parameters
    if (this.localVariables.has(name)) {
      const p = this.localVariables.get(name);
      if (p === undefined) {
        throw new Error('Unexpected error');
      }
      return p;
    }
    throw new Error('Usage of undeclared variable');
  }

  getVariable(name: string): number {
    const p = this.findVariable(name);
    if (p.local) {
      return this.bmodule.local.get(p.id, p.type);
    } else {
      switch (p.type) {
        case binaryen.i32:
          return this.bmodule.i32.load(0, 0, this.bmodule.i32.const(p.id));
        default:
          throw new Error('Unimplemented type');
      }
    }
  }

  setVariable(name: string, value: number): number {
    const p = this.findVariable(name);
    if (p.local) {
      return this.bmodule.local.set(p.id, value);
    } else {
      switch (p.type) {
        case binaryen.i32:
          return this.bmodule.i32.store(
            0,
            0,
            this.bmodule.i32.const(p.id),
            value
          );
        default:
          throw new Error('Unimplemented type');
      }
    }
  }

  addMethod(method: Method): void {
    this.methods.push(method);
  }

  static getBinType(type: string): binaryen.Type {
    switch (type) {
      case 'Int':
        return binaryen.i32;
      default:
        throw new Error('Unknown type');
    }
  }

  getStatement(estStatement: estree.Statement): Statement | null {
    switch (estStatement.type) {
      // TODO: implement statements
      case AST_NODE_TYPES.ReturnStatement:
        return new ReturnStatement(this, estStatement);
      case AST_NODE_TYPES.ExpressionStatement:
        switch (estStatement.expression.type) {
          case AST_NODE_TYPES.AssignmentExpression:
            return new AssignmentStatement(this, estStatement.expression);
          default:
            return null;
        }
      case AST_NODE_TYPES.ExpressionStatement:
      default:
        return null;
    }
  }

  getExpression(estExpression: estree.Expression): Expression | null {
    switch (estExpression.type) {
      // TODO: implement statements
      case AST_NODE_TYPES.Identifier:
        return new Identifier(this, estExpression);
      case AST_NODE_TYPES.BinaryExpression:
        return new BinaryExpression(this, estExpression);
      default:
        return null;
    }
  }
}

export { Method };
