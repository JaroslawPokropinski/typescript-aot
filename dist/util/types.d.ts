import ts from 'typescript';
/**
 * @param type Type being checked by name.
 * @param allowedNames Symbol names checking on the type.
 * @returns Whether the type is, extends, or contains all of the allowed names.
 */
export declare function containsAllTypesByName(type: ts.Type, allowAny: boolean, allowedNames: Set<string>): boolean;
/**
 * Get the type name of a given type.
 * @param typeChecker The context sensitive TypeScript TypeChecker.
 * @param type The type to get the name of.
 */
export declare function getTypeName(typeChecker: ts.TypeChecker, type: ts.Type): string;
/**
 * Resolves the given node's type. Will resolve to the type's generic constraint, if it has one.
 */
export declare function getConstrainedTypeAtLocation(checker: ts.TypeChecker, node: ts.Node): ts.Type;
/**
 * Checks if the given type is (or accepts) nullable
 * @param isReceiver true if the type is a receiving type (i.e. the type of a called function's parameter)
 */
export declare function isNullableType(type: ts.Type, { isReceiver, allowUndefined, }?: {
    isReceiver?: boolean;
    allowUndefined?: boolean;
}): boolean;
/**
 * Gets the declaration for the given variable
 */
export declare function getDeclaration(checker: ts.TypeChecker, node: ts.Expression): ts.Declaration | null;
/**
 * Gets all of the type flags in a type, iterating through unions automatically
 */
export declare function getTypeFlags(type: ts.Type): ts.TypeFlags;
/**
 * Checks if the given type is (or accepts) the given flags
 * @param isReceiver true if the type is a receiving type (i.e. the type of a called function's parameter)
 */
export declare function isTypeFlagSet(type: ts.Type, flagsToCheck: ts.TypeFlags, isReceiver?: boolean): boolean;
/**
 * @returns Whether a type is an instance of the parent type, including for the parent's base types.
 */
export declare function typeIsOrHasBaseType(type: ts.Type, parentType: ts.Type): boolean;
