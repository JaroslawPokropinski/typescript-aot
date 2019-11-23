import { ESLintUtils } from '@typescript-eslint/experimental-utils';

export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/JaroslawPokropinski/typescript-aot/blob/master/docs/rules/${name}.md`
);
