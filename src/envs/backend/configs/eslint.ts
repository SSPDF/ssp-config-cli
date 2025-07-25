// src/envs/backend/configs/eslint.ts
// ESLint v9+ flat config for NestJS backend (TypeScript)

const eslintConfig = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
        sourceType: "module",
      },
      ecmaVersion: 2022,
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/no-unused-vars": ["warn"],
      // Prettier as an ESLint rule
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: false,
          tabWidth: 4,
          trailingComma: "all",
          printWidth: 100,
        },
      ],
    },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".eslintrc.js",
      "prettier.config.js",
    ],
  },
];

export default eslintConfig;
