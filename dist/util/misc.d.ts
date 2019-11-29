/**
 * @fileoverview Really small utility functions that didn't deserve their own files
 */
import { TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
/**
 * Check if the context file name is *.d.ts or *.d.tsx
 */
export declare function isDefinitionFile(fileName: string): boolean;
/**
 * Upper cases the first character or the string
 */
export declare function upperCaseFirst(str: string): string;
declare type InferOptionsTypeFromRuleNever<T> = T extends TSESLint.RuleModule<never, infer TOptions> ? TOptions : unknown;
/**
 * Uses type inference to fetch the TOptions type from the given RuleModule
 */
export declare type InferOptionsTypeFromRule<T> = T extends TSESLint.RuleModule<string, infer TOptions> ? TOptions : InferOptionsTypeFromRuleNever<T>;
/**
 * Uses type inference to fetch the TMessageIds type from the given RuleModule
 */
export declare type InferMessageIdsTypeFromRule<T> = T extends TSESLint.RuleModule<infer TMessageIds, unknown[]> ? TMessageIds : unknown;
/**
 * Gets a string name representation of the given PropertyName node
 */
export declare function getNameFromPropertyName(propertyName: TSESTree.PropertyName): string;
/** Return true if both parameters are equal. */
export declare type Equal<T> = (a: T, b: T) => boolean;
export declare function arraysAreEqual<T>(a: T[] | undefined, b: T[] | undefined, eq: (a: T, b: T) => boolean): boolean;
/** Returns the first non-`undefined` result. */
export declare function findFirstResult<T, U>(inputs: T[], getResult: (t: T) => U | undefined): U | undefined;
/**
 * Gets a string name representation of the name of the given MethodDefinition
 * or ClassProperty node, with handling for computed property names.
 */
export declare function getNameFromClassMember(methodDefinition: TSESTree.MethodDefinition | TSESTree.ClassProperty | TSESTree.TSAbstractMethodDefinition, sourceCode: TSESLint.SourceCode): string;
export declare type ExcludeKeys<TObj extends Record<string, unknown>, TKeys extends keyof TObj> = {
    [k in Exclude<keyof TObj, TKeys>]: TObj[k];
};
export declare type RequireKeys<TObj extends Record<string, unknown>, TKeys extends keyof TObj> = ExcludeKeys<TObj, TKeys> & {
    [k in TKeys]-?: Exclude<TObj[k], undefined>;
};
export {};
