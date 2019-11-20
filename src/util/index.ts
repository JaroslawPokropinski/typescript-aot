import { ESLintUtils } from '@typescript-eslint/experimental-utils';

export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/<your-org>/<repo-name>/blob/master/docs/rules/${name}.md`
);
