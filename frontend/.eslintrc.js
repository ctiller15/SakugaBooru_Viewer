module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-empty': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'array-callback-return': 'error',
    'semi': 'error',
    'no-cond-assign': 'error',
    'no-multi-spaces': 'warn',
    'quotes': ["error", "double"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
