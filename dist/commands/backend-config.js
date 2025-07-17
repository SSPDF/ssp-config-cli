"use strict";
// src/commands/backend-config.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.backendConfigCommand = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
exports.backendConfigCommand = {
    command: "backend-config",
    describe: "Configures ESLint, Prettier, and basic standards for NestJS backend projects.",
    // Mude 'yargs' para 'yargs: Argv'
    builder: (yargs) => {
        // <--- MUDANÇA AQUI: Tipagem do parâmetro 'yargs'
        return yargs.options({
            "skip-install": {
                type: "boolean",
                default: false,
                description: "Skip running npm install after configuration.",
            },
        });
    },
    handler: async (argv) => {
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
            console.log("✅ Dependências de desenvolvimento adicionadas ao package.json.");
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
            await fs.writeFile(path.join(projectRoot, ".eslintrc.js"), eslintConfigContent.trim());
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
            await fs.writeFile(path.join(projectRoot, "prettier.config.js"), prettierConfigContent.trim());
            console.log("✅ prettier.config.js criado/atualizado.");
            if (!argv.skipInstall) {
                console.log("📦 Rodando npm install...");
                (0, child_process_1.execSync)("npm install", { stdio: "inherit", cwd: projectRoot });
                console.log("✅ Dependências instaladas.");
            }
            else {
                console.log("Instalação de dependências pulada.");
            }
            console.log("\nConfiguração de backend NestJS aplicada com sucesso!");
        }
        catch (error) {
            console.error("❌ Erro ao configurar o projeto backend:", error.message);
            process.exit(1);
        }
    },
};
