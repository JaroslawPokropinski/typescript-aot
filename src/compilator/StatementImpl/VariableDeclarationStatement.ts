import Statement from '../Statement';
import * as ast from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import StatementVisitor from '../StatementVisitor';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import ParseError from '../ParseError';
import Expression from '../Expression';
import TypeUtil from '../TypeUtil';
import CompilationDirector from '../CompilationDirector';

interface Declaration {
  visit(visitor: StatementVisitor): void;
}

export class IdentifierDeclaration implements Declaration {
  kind: string;
  name: string;
  type: string;
  init?: Expression;

  constructor(kind: string, name: string, type: string, init?: Expression) {
    this.kind = kind;
    this.name = name;
    this.type = type;
    this.init = init;
  }

  visit(visitor: StatementVisitor): void {
    visitor.onIdentifierDeclaration(this);
  }
}

export default class VariableDeclarationStatement implements Statement {
  decl: Array<Declaration>;
  constructor(private ast: ast.VariableDeclaration, director: CompilationDirector) {
    this.decl = this.ast.declarations.map((d: ast.VariableDeclarator) => {
      let init: Expression | undefined = undefined;
      if (d.init !== null) {
        init = Expression.fromNode(d.init, director);
      }

      switch (d.id.type) {
        case AST_NODE_TYPES.Identifier:
          const tname = TypeUtil.getTypeName(d.id);
          return new IdentifierDeclaration(
            this.ast.kind,
            d.id.name,
            tname,
            init
          );
        default:
          throw new ParseError('Unknown declaration statement', d);
      }
    });
  }

  process() {
    throw new Error('Method not implemented.');
  }

  visit(visitor: StatementVisitor): void {
    this.decl.forEach((d) => {
      d.visit(visitor);
    });
  }
}
