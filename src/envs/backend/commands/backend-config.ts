// src/commands/backend-config.ts
import { Arguments, Argv } from "yargs";
import * as fs from "fs-extra";
import * as path from "path";
import { execSync } from "child_process";

// --- NOVOS IMPORTS ---
import eslintConfig from "../configs/eslint"; // Importa o objeto de configuração do ESLint
import prettierConfig from "../configs/prettier"; // Importa o objeto de configuração do Prettier
// --- FIM DOS NOVOS IMPORTS ---

interface BackendConfigArgs extends Arguments {
  skipInstall?: boolean;
}

export const backendConfigCommand = {
  command: "backend-config",
  describe:
    "Configures ESLint, Prettier, and basic standards for NestJS backend projects.",
  builder: (yargs: Argv) => {
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
        "eslint-plugin-sonarjs": "^3.0.4",
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
      // Converte o objeto JavaScript em uma string exportável para o arquivo .js
      const eslintConfigContent = `module.exports = ${JSON.stringify(eslintConfig, null, 2)};`;
      await fs.writeFile(
        path.join(projectRoot, ".eslintrc.js"),
        eslintConfigContent.trim()
      );
      console.log("✅ .eslintrc.js criado/atualizado.");

      console.log("Criando/Atualizando prettier.config.js...");
      // Converte o objeto JavaScript em uma string exportável para o arquivo .js
      const prettierConfigContent = `module.exports = ${JSON.stringify(prettierConfig, null, 2)};`;
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
