#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Corrigido o caminho do import para ser relativo
import { backendConfigCommand } from "./backend-config";

yargs(hideBin(process.argv))
  .scriptName("ssp-cli") // Nome do seu comando principal
  .command(backendConfigCommand)
  // Removido o comando de frontend por enquanto
  .demandCommand(1, "Você precisa de pelo menos um comando.") // Exige que um comando seja especificado
  .help()
  .version("1.0.0") // Você pode ler a versão do package.json depois para dinamizar
  .alias("v", "version")
  .parse();
