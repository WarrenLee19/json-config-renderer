module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-constant-condition': 2,
    'no-duplicate-case': 2,
    'no-extra-semi': 2,
    'no-trailing-spaces': 2,
    'no-empty': 2,
    'no-extra-parens': 1,
    'indent': ['error', 2]
  }
};
