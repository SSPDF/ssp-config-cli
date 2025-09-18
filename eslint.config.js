// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// import prettierRecommended from "eslint-plugin-prettier/recommended.js";
const prettierRecommended = require("eslint-plugin-prettier/recommended");

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".eslintrc.js",
      "prettier.config.js",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Add custom or override rules here if needed
      // '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
);
