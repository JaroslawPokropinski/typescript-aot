declare const _default: {
    rules: {
        'ts-aot': import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleModule<"uncompilable", boolean[], {
            MethodDefinition(node: import("@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree").MethodDefinition): void;
        }>;
    };
};
export = _default;
