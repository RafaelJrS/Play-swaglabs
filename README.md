# 🎭 Play-SwagLabs — Automação de Testes E2E com Playwright, MCP & Test Agents

Bem-vindo ao repositório **Play-SwagLabs**, um projeto de referência em Engenharia de Qualidade (QA) para automação de testes End-to-End (E2E) na aplicação [Swag Labs (SauceDemo)](https://www.saucedemo.com), construído com **Playwright**, **TypeScript**, arquitetura **Page Object Model (POM)** e integrado nativamente com Inteligência Artificial através do **Playwright MCP** e dos **Playwright Test Agents**.

---

## 📋 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Arquitetura de Pastas](#-arquitetura-de-pastas)
3. [Passo a Passo: Como Instalar e Configurar o Playwright](#-passo-a-passo-como-instalar-e-configurar-o-playwright)
4. [Configurando o Playwright MCP (Model Context Protocol)](#-configurando-o-playwright-mcp-model-context-protocol)
5. [Configurando os Playwright Test Agents (Planner, Generator e Healer)](#-configurando-os-playwright-test-agents-planner-generator-e-healer)
6. [Executando os Testes e Relatórios](#-executando-os-testes-e-relatórios)
7. [Boas Práticas Adotadas no Projeto](#-boas-práticas-adotadas-no-projeto)
8. [Conclusão: Por que o Playwright é o Líder do Mercado Atual?](#-conclusão-por-que-o-playwright-é-o-líder-do-mercado-atual)

---

## 🎯 Sobre o Projeto

Este projeto automatiza fluxos críticos da plataforma de e-commerce **Swag Labs**, aplicando padrões modernos de arquitetura de software voltados para testes:

- **Framework E2E:** [`@playwright/test`](https://playwright.dev/) com TypeScript.
- **Padrão de Projeto:** **Page Object Model (POM)** com injeção de dependências via **Custom Fixtures**.
- **Seletores Resilientes:** Prioridade estrita para atributos dedicados de teste (`[data-test="..."]`) e seletores de acessibilidade.
- **Automação Assistida por IA:** Integração direta com servidores **MCP** e agentes autônomos de planejamento, geração e auto-correção (*self-healing*) de testes.

---

## 🏗️ Arquitetura de Pastas

A estrutura do projeto une a separação clássica em camadas do **Page Object Model** com os diretórios oficiais exigidos pelos **Playwright Test Agents**:

```text
📁 Play-swaglabs/
├── 📁 .agents/skills/          # Skills nativas do Antigravity (Planner, Generator, Healer)
│   ├── 📁 playwright-test-planner/
│   ├── 📁 playwright-test-generator/
│   └── 📁 playwright-test-healer/
├── 📁 .claude/agents/          # Definições dos agentes Playwright para Claude Code
├── 📁 .github/
│   ├── 📁 agents/              # Definições oficiais Playwright Test Agents (.agent.md)
│   └── 📁 workflows/           # Pipelines CI/CD (playwright.yml, copilot-setup-steps.yml)
├── 📁 .vscode/                 # Configuração local dos servidores MCP (mcp.json)
├── 📁 context/                 # Living Context (documentação viva de arquitetura e padrões)
├── 📁 fixtures/                # Fixtures customizadas para injeção de Page Objects (pom.fixture.ts)
├── 📁 pages/                   # Page Object Model (POM) com locadores e ações de negócio
│   └── 📄 LoginPage.ts
├── 📁 specs/                   # Planos de teste em Markdown gerados pelo agente Planner
│   └── 📄 README.md
├── 📁 test-data/               # Massa de dados isolada e parametrizada via ambiente
│   └── 📄 users.ts
├── 📁 tests/                   # Cenários executáveis (.spec.ts) e seed de ambiente
│   ├── 📄 login.spec.ts
│   └── 📄 seed.spec.ts
├── 📁 utils/                   # Funções utilitárias de suporte (env.ts)
├── 📄 .mcp.json                # Configuração dos servidores MCP na raiz do projeto
├── 📄 playwright.config.ts     # Configuração central do Playwright Test Runner
└── 📄 package.json             # Dependências e scripts NPM
```

---

## 🚀 Passo a Passo: Como Instalar e Configurar o Playwright

Siga o guia abaixo para instalar o Playwright do zero ou configurar este repositório em sua máquina.

### Pré-requisitos
- **Node.js** (versão 18 LTS, 20 LTS ou 22+ recomendada) — [Download Node.js](https://nodejs.org/)
- **Git** instalado na máquina.

### Passo 1: Clonar o repositório (ou iniciar um projeto do zero)

Para clonar este projeto:
```bash
git clone https://github.com/RafaelJrS/Play-swaglabs.git
cd Play-swaglabs
```

> 💡 **Caso queira criar um projeto Playwright do zero em uma nova pasta:**
> ```bash
> mkdir meu-projeto-playwright
> cd meu-projeto-playwright
> npm init -y
> ```

### Passo 2: Instalar a dependência oficial do Playwright Test

Instale o pacote `@playwright/test` como dependência de desenvolvimento:

```bash
npm install -D @playwright/test
```

> Alternativamente, você pode usar o gerador interativo oficial:
> ```bash
> npm init playwright@latest
> ```

### Passo 3: Instalar os Navegadores (Browsers) do Playwright

O Playwright gerencia seus próprios binários de navegadores (`Chromium`, `Firefox`, `WebKit`) para garantir reprodutibilidade:

```bash
# Instala todos os navegadores padrão
npx playwright install

# Ou instale apenas o Chromium (mais rápido e leve para CI/CD)
npx playwright install chromium
```

> Em ambientes Linux/CI, adicione a flag `--with-deps` para instalar dependências de sistema operacional:
> ```bash
> npx playwright install --with-deps chromium
> ```

### Passo 4: Verificar a Instalação

Confirme que o Playwright foi instalado corretamente verificando sua versão:

```bash
npx playwright --version
```

---

## 🔌 Configurando o Playwright MCP (Model Context Protocol)

O **Playwright MCP** é o servidor oficial da Microsoft que implementa o *Model Context Protocol*, permitindo que assistentes e agentes de IA (Antigravity, VS Code Copilot, Claude, Cursor) interajam diretamente com o navegador usando **Snapshots da Árvore de Acessibilidade (ARIA)** estruturados e determinísticos, sem depender apenas de capturas de tela pesadas.

🔗 **Repositório Oficial (GitHub):**  
👉 **[https://github.com/microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)**

### Como configurar o Playwright MCP

1. Adicione a configuração do servidor MCP no arquivo [`.mcp.json`](./.mcp.json) (na raiz do projeto) ou no arquivo global de configuração do seu assistente (`~/.gemini/config/mcp_config.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

2. Para uso no **VS Code** ([`.vscode/mcp.json`](./.vscode/mcp.json)):

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

### Flags Úteis para o `@playwright/mcp`
Você pode passar argumentos adicionais no array `args` conforme sua necessidade:
- `"--headless"`: Executa o navegador em segundo plano, sem abrir janela gráfica.
- `"--browser=chromium"` (ou `firefox`, `webkit`, `msedge`): Define o navegador alvo.
- `"--device=iPhone 15"`: Emula dispositivos móveis nativamente.
- `"--caps=vision"`: Habilita recursos baseados em visão computacional/screenshots além dos snapshots de acessibilidade.

---

## 🤖 Configurando os Playwright Test Agents (`Planner`, `Generator` e `Healer`)

A partir das versões recentes do Playwright, o framework conta com **Agentes de Teste Nativos** (*Playwright Test Agents*) que trabalham em conjunto com o servidor MCP de testes (`npx playwright run-test-mcp-server`) para planejar, gerar e curar testes quebrados automaticamente.

🔗 **Documentação Oficial (Playwright Test Agents):**  
👉 **[https://playwright.dev/docs/test-agents#agent-definitions](https://playwright.dev/docs/test-agents#agent-definitions)**

### Passo 1: Inicializar as Definições dos Agentes via CLI

Execute o comando oficial do Playwright informando o ambiente de loop desejado (`vscode`, `claude`, `codex` ou `opencode`):

```bash
# Para VS Code / GitHub Copilot
npx playwright init-agents --loop=vscode

# Para Claude Code
npx playwright init-agents --loop=claude
```

> ⚠️ **Dica Oficial:** Sempre re-execute o comando `npx playwright init-agents` quando atualizar a versão do `@playwright/test`, garantindo que os agentes recebam as ferramentas e instruções mais recentes.

### Passo 2: Conheça o Papel de Cada Agente

| Agente | Arquivo de Definição | Como Funciona |
| :--- | :--- | :--- |
| **🎭 Planner** (`playwright-test-planner`) | [`.github/agents/playwright-test-planner.agent.md`](./.github/agents/playwright-test-planner.agent.md) | Executa o teste semente ([`tests/seed.spec.ts`](./tests/seed.spec.ts)), navega ao vivo pela aplicação inspecionando elementos interativos, mapeia fluxos felizes (*Happy Path*) e casos de borda (*Edge Cases*), e salva planos de teste completos em Markdown na pasta [`specs/`](./specs/). |
| **⚡ Generator** (`playwright-test-generator`) | [`.github/agents/playwright-test-generator.agent.md`](./.github/agents/playwright-test-generator.agent.md) | Lê o plano de teste em Markdown gerado em [`specs/`](./specs/), executa cada passo em tempo real no navegador para validar seletores e asserções, e escreve os arquivos `.spec.ts` prontos para produção dentro de [`tests/`](./tests/). |
| **🛠️ Healer** (`playwright-test-healer`) | [`.github/agents/playwright-test-healer.agent.md`](./.github/agents/playwright-test-healer.agent.md) | Roda a suíte de testes (`test_run`), depura testes que falharam (`test_debug`), analisa snapshots do DOM/erros de sincronismo ou seletores alterados, aplica a correção no código e re-executa até que toda a suíte passe. |

### Passo 3: Servidor MCP dos Test Agents (`playwright-test`)

Quando você inicializa os agentes, o Playwright registra também o servidor MCP dedicado à execução e depuração de testes:

```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "playwright",
        "run-test-mcp-server"
      ]
    }
  }
}
```

---

## 🧪 Executando os Testes e Relatórios

Os scripts já estão configurados no [`package.json`](./package.json) para facilitar o dia a dia:

```bash
# 1. Executar todos os testes (conforme configurado no playwright.config.ts)
npm test

# 2. Executar os testes vendo o navegador abrir (Modo Headed)
npm run test:headed

# 3. Abrir a interface visual interativa do Playwright (UI Mode com Time-Travel)
npm run test:ui

# 4. Executar um arquivo de teste específico
npx playwright test tests/login.spec.ts

# 5. Abrir o último relatório HTML gerado
npm run report
```

---

## 🛡️ Boas Práticas Adotadas no Projeto

1. **Page Object Model Enxuto (`pages/`):** Nenhuma lógica de seletor fica exposta nos arquivos `.spec.ts`. Os métodos de negócio possuem responsabilidade única e menos de 20 linhas.
2. **Zero `waitForTimeout` (Sem *Hardcoded Sleeps*):** Todas as sincronizações utilizam *Web-First Assertions* (`await expect(locator).toBeVisible()`) e o *auto-wait* nativo do Playwright.
3. **Seletores Resilientes (`[data-test="..."]`):** Imunes a mudanças visuais de CSS ou refatorações de layout.
4. **Massa de Dados Desacoplada (`test-data/users.ts`):** Credenciais isoladas e preparadas para sobrescrita via variáveis de ambiente (`process.env`).

---

## 🏆 Conclusão: Por que o Playwright é o Líder do Mercado Atual?

Nos últimos anos, o **Playwright** (criado e mantido pela Microsoft pela mesma equipe que originalmente desenvolveu o Puppeteer no Google) consolidou-se como a ferramenta de automação de testes End-to-End **mais adotada e recomendada no mercado global de tecnologia**, superando ferramentas tradicionais como Selenium e alternativas anteriores como Cypress em novos projetos.

### As Principais Vantagens Técnicas do Playwright

1. **Arquitetura Moderna via WebSocket (Sem WebDriver Intermediário):**
   Diferente do Selenium, que depende do protocolo HTTP WebDriver traduzindo cada comando por meio de drivers intermediários, o Playwright se comunica diretamente com a engine dos navegadores (via *Chrome DevTools Protocol - CDP* e protocolos equivalentes no Firefox e WebKit) por uma única conexão **WebSocket bidirecional persistente**. O resultado é uma execução drasticamente mais rápida e estável.

2. **Auto-Wait Inteligente e Fim dos *Flaky Tests*:**
   A maior dor histórica da automação Web sempre foi a instabilidade (*flakiness*) causada por elementos que ainda estão carregando ou animando. Antes de qualquer clique ou preenchimento, o Playwright verifica automaticamente se o elemento está anexado ao DOM, visível, estável (sem animação em curso), habilitado e recebendo eventos, reduzindo drasticamente falhas intermitentes sem precisar de `sleep()` manual.

3. **Isolamento Instantâneo com *Browser Contexts*:**
   Criar uma nova sessão limpa no Playwright leva apenas **alguns milissegundos**. Em vez de abrir e fechar o navegador inteiro a cada teste, o Playwright utiliza *Browser Contexts* (equivalentes a perfis anônimos totalmente isolados em memória). Isso garante que um teste nunca contamine o estado, cookies ou `localStorage` de outro.

4. **Paralelismo Nativo e Gratuito:**
   O `@playwright/test` executa testes em paralelo por padrão através de múltiplos *workers* locais e suporta *sharding* nativo em pipelines de CI/CD (`--shard=1/4`), sem exigir licenças pagas ou infraestruturas proprietárias para paralelizar sua esteira.

5. **Suporte Multi-Browser, Multi-Tab, Iframes e Multi-Linguagem Real:**
   - Roda nos três principais motores do mercado: **Chromium** (Chrome/Edge), **WebKit** (Safari) e **Firefox**.
   - Não sofre com limitações de *sandbox* dentro de uma única aba: suporta nativamente **múltiplas abas, múltiplas janelas, múltiplos usuários simultâneos** (ex.: testar um chat entre dois usuários no mesmo teste), *iframes* e *Shadow DOM*.
   - Disponível oficialmente para **TypeScript/JavaScript, Python, Java e .NET (C#)**.

6. **Ferramentas de Diagnóstico Incomparáveis (*Trace Viewer* & *UI Mode*):**
   Quando um teste falha no CI, o **Playwright Trace Viewer** entrega uma verdadeira "máquina do tempo": grava o snapshot completo do DOM antes e depois de cada ação, logs de console, tráfego de rede (HAR), screenshots e linha do tempo em milissegundos, permitindo inspecionar o DOM ao vivo de um teste que rodou horas atrás no servidor.

7. **Vanguarda na Era da Inteligência Artificial (MCP & Test Agents):**
   Com o lançamento oficial do **[Playwright MCP](https://github.com/microsoft/playwright-mcp)** e dos **[Playwright Test Agents](https://playwright.dev/docs/test-agents#agent-definitions)** (`Planner`, `Generator` e `Healer`), o Playwright tornou-se a primeira plataforma de testes E2E projetada nativamente para ser operada por Agentes de IA. Ao expor a árvore de acessibilidade real do navegador via protocolo MCP, o Playwright transforma o papel do QA: de mantenedor manual de seletores quebrados para **Arquiteto de Qualidade potencializado por IA**.

