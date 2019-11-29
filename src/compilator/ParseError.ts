import { BaseNode } from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';

export default class ParseError extends Error {
  message: string;
  node: BaseNode;

  constructor(message: string, node: BaseNode) {
    super(message);
    this.message = message;
    this.node = node;
  }
}

ParseError.prototype.toString = function() {
  return `${this.message} (${this.node.loc.start.line}, ${this.node.loc.start.column})`;
};
