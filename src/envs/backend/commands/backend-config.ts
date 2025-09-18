// src/commands/backend-config.ts
import { Arguments, Argv } from 'yargs'
import { promises as fs } from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

// --- NOVOS IMPORTS ---
import eslintConfig from '../configs/eslint' // Importa o objeto de configuração do ESLint
import prettierConfig from '../configs/prettier' // Importa o objeto de configuração do Prettier
// --- FIM DOS NOVOS IMPORTS ---

const ESLINT_CONFIG_FILENAME = 'eslint.config.js' // <--- NOVO NOME

interface BackendConfigArgs extends Arguments {
    skipInstall?: boolean
}

export const backendConfigCommand = {
    command: 'backend-config',
    describe: 'Configures ESLint, Prettier, and basic standards for NestJS backend projects.',
    builder: (yargs: Argv) => {
        return yargs.options({
            'skip-install': {
                type: 'boolean',
                default: false,
                description: 'Skip running npm install after configuration.',
            },
        })
    },
    handler: async (argv: BackendConfigArgs) => {
        const projectRoot = process.cwd()
        console.log(`Configurando projeto NestJS em: ${projectRoot}`)

        try {
            const packageJsonPath = path.join(projectRoot, 'package.json')
            let packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8')
            let packageJson = JSON.parse(packageJsonRaw)

            console.log('Adicionando dependências de desenvolvimento...')
            const devDependenciesToAdd = {
                eslint: '^9.0.0',
                prettier: '^3.0.0',
                '@typescript-eslint/eslint-plugin': '^8.0.0',
                '@typescript-eslint/parser': '^8.0.0',
                'eslint-config-prettier': '^10.0.0',
                typescript: '^5.0.0',
            }

            packageJson.devDependencies = {
                ...packageJson.devDependencies,
                ...devDependenciesToAdd,
            }

            await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
            console.log('✅ Dependências de desenvolvimento adicionadas ao package.json.')

            console.log(`Criando/Atualizando ${ESLINT_CONFIG_FILENAME}...`)
            const eslintConfigContent = `
        const eslintPluginPrettierRecommended = require('eslint-plugin-prettier').configs.recommended;
        const eslintJs = require('@eslint/js');
        module.exports = ${JSON.stringify(eslintConfig, null, 2)};
      `
            await fs.writeFile(
                path.join(projectRoot, ESLINT_CONFIG_FILENAME),
                eslintConfigContent.trim(),
            )
            console.log(`✅ ${ESLINT_CONFIG_FILENAME} criado/atualizado.`)

            console.log('Criando/Atualizando prettier.config.js...')
            const prettierConfigContent = `module.exports = ${JSON.stringify(prettierConfig, null, 2)};`
            await fs.writeFile(
                path.join(projectRoot, 'prettier.config.js'),
                prettierConfigContent.trim(),
            )
            console.log('✅ prettier.config.js criado/atualizado.')

            if (!argv.skipInstall) {
                console.log('📦 Rodando npm install...')
                execSync('npm install', { stdio: 'inherit', cwd: projectRoot })
                console.log('✅ Dependências instaladas.')
            } else {
                console.log('Instalação de dependências pulada.')
            }

            // Polished output for clarity
            console.log('\n✅ ESLint e Prettier configurados com as melhores práticas modernas!')
            console.log('\nSe quiser pular a instalação de dependências, use: --skip-install')
            console.log('\nPronto para rodar lint e format no seu projeto NestJS 🚀')
        } catch (error: any) {
            console.error('❌ Erro ao configurar o projeto backend:', error.message)
            process.exit(1)
        }
    },
}
