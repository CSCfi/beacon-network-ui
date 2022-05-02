module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json"
      },
      plugins: ["@typescript-eslint"]
    }
  ]
};
