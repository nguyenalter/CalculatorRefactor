module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    radix: 'off',
    eqeqeq: 'off',
    'max-len': ['error', { code: 200 }],
  },
};
