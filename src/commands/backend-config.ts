// src/commands/backend-config.ts

import { Arguments, Argv } from "yargs"; // <--- Adicione Argv aqui
import * as fs from "fs-extra";
import * as path from "path";
import { execSync } from "child_process";

interface BackendConfigArgs extends Arguments {
  skipInstall?: boolean;
}

export const backendConfigCommand = {
  command: "backend-config",
  describe:
    "Configures ESLint, Prettier, and basic standards for NestJS backend projects.",
  // Mude 'yargs' para 'yargs: Argv'
  builder: (yargs: Argv) => {
    // <--- MUDANÇA AQUI: Tipagem do parâmetro 'yargs'
    return yargs.options({
      "skip-install": {
        type: "boolean",
        default: false,
        description: "Skip running npm install after configuration.",
      },
    });
  },
  handler: async (argv: BackendConfigArgs) => {
    const projectRoot = process.cwd();
    console.log(`Configurando projeto NestJS em: ${projectRoot}`);

    try {
      const packageJsonPath = path.join(projectRoot, "package.json");
      let packageJson = await fs.readJson(packageJsonPath);

      console.log("Adicionando dependências de desenvolvimento...");
      const devDependenciesToAdd = {
        eslint: "^9.0.0",
        prettier: "^3.0.0",
        "@typescript-eslint/eslint-plugin": "^8.0.0",
        "@typescript-eslint/parser": "^8.0.0",
        "eslint-config-prettier": "^9.0.0",
        "eslint-plugin-unused-imports": "^4.1",
        "eslint-plugin-sonarjs": "^0.21.0",
        typescript: "^5.0.0",
      };

      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...devDependenciesToAdd,
      };

      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      console.log(
        "✅ Dependências de desenvolvimento adicionadas ao package.json."
      );

      console.log("Criando/Atualizando .eslintrc.js...");
      const eslintConfigContent = `
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'sonarjs'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.js', 'prettier.config.js'],
  rules: {
    'require-await': 'error',
    '@typescript-eslint/require-await': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'prettier/prettier': ['error', {
      singleQuote: true,
      semi: false,
      tabWidth: 4,
      trailingComma: 'all',
      printWidth: 100,
    }],
  },
};
`;
      await fs.writeFile(
        path.join(projectRoot, ".eslintrc.js"),
        eslintConfigContent.trim()
      );
      console.log("✅ .eslintrc.js criado/atualizado.");

      console.log("Criando/Atualizando prettier.config.js...");
      const prettierConfigContent = `
module.exports = {
  singleQuote: true,
  semi: false,
  tabWidth: 4,
  trailingComma: 'all',
  printWidth: 100,
};
`;
      await fs.writeFile(
        path.join(projectRoot, "prettier.config.js"),
        prettierConfigContent.trim()
      );
      console.log("✅ prettier.config.js criado/atualizado.");

      if (!argv.skipInstall) {
        console.log("📦 Rodando npm install...");
        execSync("npm install", { stdio: "inherit", cwd: projectRoot });
        console.log("✅ Dependências instaladas.");
      } else {
        console.log("Instalação de dependências pulada.");
      }

      console.log("\nConfiguração de backend NestJS aplicada com sucesso!");
    } catch (error: any) {
      console.error("❌ Erro ao configurar o projeto backend:", error.message);
      process.exit(1);
    }
  },
};
