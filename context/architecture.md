# Architecture Reference

## Árvore de Diretórios (Playwright + Test Agents)

```text
📁 Play-swaglabs/
├── 📁 .agents/skills/          # Skills nativas do Antigravity (Planner, Generator, Healer)
├── 📁 .claude/agents/          # Definições de agentes Playwright para Claude Code
├── 📁 .github/
│   ├── 📁 agents/              # Definições oficiais Playwright Test Agents (.agent.md)
│   └── 📁 workflows/           # Pipelines CI/CD (playwright.yml, copilot-setup-steps.yml)
├── 📁 .vscode/                 # Configuração local dos servidores MCP (mcp.json)
├── 📁 context/                 # Living Context (documentação viva de arquitetura e padrões)
├── 📁 fixtures/                # Fixtures customizadas de injeção de Page Objects (pom.fixture.ts)
├── 📁 pages/                   # Page Object Model (POM) com locadores e ações (< 20 linhas)
├── 📁 specs/                   # Planos de teste em Markdown gerados pelo Playwright Planner
├── 📁 test-data/               # Massa de dados isolada e parametrizada (users.ts)
├── 📁 tests/                   # Cenários executáveis (.spec.ts) e bootstrap de agente (seed.spec.ts)
├── 📁 utils/                   # Funções utilitárias de suporte (env.ts)
├── 📄 .mcp.json                # Configuração dos servidores MCP (playwright e playwright-test)
├── 📄 playwright.config.ts     # Configuração central do Playwright Test Runner
└── 📄 package.json             # Dependências e scripts de execução
```

## Responsabilidade de Cada Camada

1. **`specs/` (Camada de Planejamento - Agent Planner):**
   - Armazena planos de teste estruturados em Markdown gerados pelo agente [`playwright-test-planner`](../.github/agents/playwright-test-planner.agent.md) após explorar a aplicação via `tests/seed.spec.ts`.
2. **`tests/` (Camada de Execução - Agent Generator & Healer):**
   - Contém os testes automatizados (`.spec.ts`) e o arquivo semente (`seed.spec.ts`).
   - Apenas orquestra chamadas aos Page Objects/Fixtures e asserções de negócio.
   - Alimentado pelo [`playwright-test-generator`](../.github/agents/playwright-test-generator.agent.md) e mantido pelo [`playwright-test-healer`](../.github/agents/playwright-test-healer.agent.md).
3. **`pages/` (Camada de Abstração - Page Object Model):**
   - Encapsula locadores resilientes (`[data-test="..."]`) e métodos de ação/validação atômicos (máximo de 20 linhas por método).
4. **`fixtures/` (Camada de Injeção de Dependência):**
   - Estende o `test` base do `@playwright/test` para injetar instâncias prontas dos Page Objects nos testes.
5. **`test-data/` & `utils/` (Camada de Dados e Suporte):**
   - Isola credenciais parametrizadas por variáveis de ambiente e funções auxiliares.
