module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
  },
  extends: [
    "expo",
    "prettier",
    "universe/native",
    "universe/shared/typescript-analysis",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "no-console": "warn",
    "no-debugger": "warn",
    "import/no-unresolved": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
  },
  ignorePatterns: [
    "node_modules/",
    ".expo/",
    "dist/",
    "web-build/",
    "*.config.js",
    ".eslintrc.js",
    "**/*.d.ts",
  ],
  overrides: [
    {
      files: ["src/**/*.d.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
};
