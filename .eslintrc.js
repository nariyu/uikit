module.exports = {
  env: { node: true, es6: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
  ],
  plugins: ['prettier', 'import'],
  parser: 'babel-eslint',
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/order': [2, { alphabetize: { order: 'asc' } }],
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
