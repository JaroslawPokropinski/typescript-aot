import { BaseNode } from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
export default class ParseError extends Error {
    message: string;
    node: BaseNode;
    constructor(message: string, node: BaseNode);
}
