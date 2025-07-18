const eslintConfig = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"], // O projeto consumidor precisará de um tsconfig.json válido
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "unused-imports", "sonarjs"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    "dist",
    "node_modules",
    ".eslintrc.js",
    "prettier.config.js",
  ],
  rules: {
    "require-await": "error",
    "@typescript-eslint/require-await": "error",
    "unused-imports/no-unused-imports": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    // As regras do Prettier serão injetadas pelo 'plugin:prettier/recommended'
    // Mas se precisar de regras específicas, defina-as aqui:
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
};

export default eslintConfig;
