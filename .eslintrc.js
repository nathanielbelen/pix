module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'no-useless-escape': 'off',
  },
};
