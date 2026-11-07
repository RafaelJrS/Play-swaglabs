# Architecture Reference

## Árvore de Diretórios (Playwright + Test Agents + SRP POM)

```text
📁 Play-swaglabs/
├── 📁 .agents/skills/          # Skills nativas do Antigravity (Planner, Generator, Healer, Gunter)
├── 📁 .claude/agents/          # Definições de agentes Playwright para Claude Code
├── 📁 .github/
│   ├── 📁 agents/              # Definições oficiais Playwright Test Agents (.agent.md)
│   └── 📁 workflows/           # Pipelines CI/CD (playwright.yml, copilot-setup-steps.yml)
├── 📁 .vscode/                 # Configuração local dos servidores MCP (mcp.json)
├── 📁 context/                 # Living Context (documentação viva de arquitetura e padrões)
├── 📁 fixtures/                # Fixtures customizadas (pom.fixture.ts) com injeção de Pages e Components
├── 📁 pages/                   # Page Object Model (POM) sob Single Responsibility Principle (SRP)
│   ├── 📁 components/          # Componentes transversais reutilizáveis (Header, SideMenu, Footer, ErrorBanner)
│   ├── 📄 LoginPage.ts
│   ├── 📄 InventoryPage.ts
│   ├── 📄 ProductDetailPage.ts
│   ├── 📄 CartPage.ts
│   ├── 📄 CheckoutInformationPage.ts
│   ├── 📄 CheckoutOverviewPage.ts
│   └── 📄 CheckoutCompletePage.ts
├── 📁 specs/                   # Planos de teste em Markdown gerados pelo Playwright Planner
├── 📁 test-data/               # Massa de dados tipada e parametrizada (types, app-content, users, checkout)
├── 📁 tests/                   # Cenários executáveis (.spec.ts) com tags (@smoke, @negative, @regression)
├── 📁 utils/                   # Funções utilitárias de suporte (env.ts)
├── 📄 .mcp.json                # Configuração dos servidores MCP (playwright e playwright-test)
├── 📄 playwright.config.ts     # Configuração central do Playwright Test Runner (adaptativa Local/CI)
├── 📄 tsconfig.json            # Configuração estrita do compilador TypeScript (strict: true, noEmit: true)
└── 📄 package.json             # Dependências e scripts de execução
```

## Responsabilidade de Cada Camada

1. **`specs/` (Camada de Planejamento - Agent Planner):**
   - Armazena planos de teste estruturados em Markdown gerados pelo agente [`playwright-test-planner`](../.github/agents/playwright-test-planner.agent.md) após explorar a aplicação via `tests/seed.spec.ts`.
2. **`tests/` (Camada de Execução - Agent Generator & Healer):**
   - Contém os testes automatizados (`.spec.ts`) e o arquivo semente (`seed.spec.ts`).
   - Apenas orquestra chamadas às Pages/Components injetadas por fixture e consome dados de `test-data/`.
   - Categorizado por tags nativas (`@smoke`, `@negative`, `@regression`, `@auth`, `@e2e`).
3. **`pages/` & `pages/components/` (Camada de Abstração - POM & Component Pattern):**
   - **Pages:** 1 classe por rota/tela da aplicação (`LoginPage`, `InventoryPage`, `ProductDetailPage`, `CartPage`, `CheckoutInformationPage`, `CheckoutOverviewPage`, `CheckoutCompletePage`).
   - **Components:** Elementos transversais de layout (`HeaderComponent`, `SideMenuComponent`, `FooterComponent`, `ErrorBannerComponent`) reutilizados por composição.
   - Todos os métodos possuem `< 20 linhas`, `readonly Locator` e retorno explícito `Promise<void>`.
4. **`fixtures/` (Camada de Injeção de Dependência):**
   - Estende o `test` base do `@playwright/test` em `fixtures/pom.fixture.ts` para injetar todas as 7 Pages e 3 Components compartilhados.
5. **`test-data/` & `utils/` (Camada de Dados e Suporte):**
   - Isola contratos TypeScript (`types.ts`), textos e mensagens da aplicação (`app-content.ts`), credenciais parametrizadas via `getEnv()` (`users.ts`) e massa de produtos/checkout (`checkout.ts`).
