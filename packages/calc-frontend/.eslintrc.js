module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'no-plusplus': 'off',
    'no-continue': 'off',
    radix: 'off',
    eqeqeq: 'off',
    'no-param-reassign': 'off',
    'max-len': ['error', { code: 200 }],
  },
};
