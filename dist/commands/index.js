#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
// Corrigido o caminho do import para ser relativo
const backend_config_1 = require("./backend-config");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .scriptName("ssp-cli") // Nome do seu comando principal
    .command(backend_config_1.backendConfigCommand)
    // Removido o comando de frontend por enquanto
    .demandCommand(1, "Você precisa de pelo menos um comando.") // Exige que um comando seja especificado
    .help()
    .version("1.0.0") // Você pode ler a versão do package.json depois para dinamizar
    .alias("v", "version")
    .parse();
