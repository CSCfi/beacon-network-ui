module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "prettier"],

  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  'extends': [
    'plugin:vue/essential',
    'prettier',
    '@vue/typescript'
  ]
};
