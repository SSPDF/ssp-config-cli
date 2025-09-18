# @ssplib/ssp-config-cli

Uma **Interface de Linha de Comando (CLI) customizada** para padronizar e automatizar a configuração de projetos de desenvolvimento de software na SSP-DF, abrangendo tanto aplicações **backend em NestJS** quanto, futuramente, **frontend em Next.js**.

Esta ferramenta visa garantir a consistência das práticas de linting, formatação e outras configurações essenciais em todos os nossos repositórios, utilizando ferramentas como ESLint e Prettier.

## ✨ Funcionalidades

Atualmente, a `@ssplib/ssp-config-cli` oferece o seguinte comando:

- `backend-config`: Configura automaticamente as dependências de ESLint, Prettier e padrões de código para projetos backend NestJS.

### 🆕 Novidades da v0.1.7:
- ✅ **Dependências atualizadas**: Jest v30, @types/node v22, yargs v18
- ✅ **Compatibilidade**: Node.js 22.17.1
- ✅ **ESLint 9**: Suporte completo ao ESLint v9 com flat config
- ✅ **Correções**: Resolved dependency conflicts e runtime issues

## 🚀 Instalação

Você pode instalar a `@ssplib/ssp-config-cli` globalmente para usá-la em qualquer lugar do seu sistema, ou localmente em cada projeto onde ela for necessária.

### Instalação Global (Recomendado)

```bash
npm install -g @ssplib/ssp-config-cli
# ou
yarn global add @ssplib/ssp-config-cli
```

Após a instalação global, você pode executar a CLI diretamente de qualquer diretório.

### Instalação Local (como `devDependency`)

```bash
npm install -D @ssplib/ssp-config-cli
# ou
yarn add -D @ssplib/ssp-config-cli
```

Se instalada localmente, você precisará usar `npx` para executar os comandos:
`npx @ssplib/ssp-config-cli <comando>`

## 💡 Uso

### Configurar Projeto Backend (NestJS)

Este comando adicionará e configurará automaticamente as dependências de ESLint e Prettier no seu projeto NestJS, criando os arquivos `eslint.config.js` (ESLint v9 flat config) e `prettier.config.js` e ajustando o `package.json`.

1.  **Navegue até a raiz do seu projeto NestJS**.

2.  **Execute o comando:**

    ```bash
    @ssplib/ssp-config-cli backend-config
    ```

    Opcionalmente, para simular as mudanças sem aplicá-las (útil para testar):

    ```bash
    @ssplib/ssp-config-cli backend-config --skip-install
    ```

    A flag `--skip-install` também evita que `npm install` seja executado automaticamente.

## 🛠️ Desenvolvimento

Para contribuir ou desenvolver na `@ssplib/ssp-config-cli` você precisará clonar o repositório e configurar o ambiente:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/SEU_USUARIO/@ssplib/ssp-config-cli.git](https://github.com/SEU_USUARIO/@ssplib/ssp-config-cli.git)
    cd @ssplib/ssp-config-cli
    ```

2.  **Instale as dependências de desenvolvimento:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Compile o código:**

    ```bash
    npm run build
    ```

    Isso compilará o código TypeScript da `src/` para a pasta `dist/`.

4.  **Teste suas alterações localmente (durante o desenvolvimento):**
    Para testar o comando `@ssplib/ssp-config-cli` localmente sem precisar publicá-lo, você pode usar `npm link` ou gerar um `.tgz`.
    - **Usando `npm link` (mais comum para desenvolvimento contínuo):**

      ```bash
      # Na raiz do projeto @ssplib/ssp-config-cli
      npm link

      # Na raiz do seu projeto de teste (ex: viva-flor-api)
      npm link @ssplib/ssp-config-cli
      ```

      Agora você pode executar `@ssplib/ssp-config-cli backend-config` no projeto de teste.

    - **Gerando e Instalando um `.tgz` (para simular a publicação):**

      ```bash
      # Na raiz do projeto @ssplib/ssp-config-cli
      npm pack

      # Na raiz do seu projeto de teste
      npm install -D /caminho/completo/para/ssplib-ssp-config-cli-0.1.7.tgz
      ```

      Depois, execute `npx ssp-config-cli backend-config`.

## 🤝 Contribuição

Contribuições são bem-vindas\! Se você tiver sugestões, reportar bugs ou quiser adicionar novas funcionalidades, por favor, abra uma issue ou envie um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

## ✉️ Contato

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento da SSP-DF.
