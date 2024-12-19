module.exports = {
  extends: ["universe/native", "universe/shared/typescript-analysis"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "import/no-unresolved": "error",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  ignorePatterns: [
    "node_modules/",
    ".expo/",
    "dist/",
    "web-build/",
    "babel.config.js",
    "metro.config.js",
  ],
};
