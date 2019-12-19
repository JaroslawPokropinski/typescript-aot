// import { Identifier } from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
// import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
// import ParseError from './ParseError';

export default class TypeUtil {
  // static getTypeName(node: Identifier): string {
  //   const t = node.typeAnnotation;
  //   if (t === undefined) {
  //     throw new ParseError('Declaration of variable requires type', node);
  //   }
  //   if (t.typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference) {
  //     throw new ParseError('Type must be TSTypeReference', t.typeAnnotation);
  //   }
  //   if (t.typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier) {
  //     throw new ParseError(
  //       'Type must be Identifier',
  //       t.typeAnnotation.typeName
  //     );
  //   }
  //   return t.typeAnnotation.typeName.name;
  // }
  static isBuiltinType(name: string): boolean {
    switch(name) {
      case "Int":
        return true;
      case "Float":
        return true;
      case "CArray":
        return true;
      default:
        return false;
    }
  }
}
