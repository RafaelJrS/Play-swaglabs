# Patterns Catalog

## 1. Page Object Model Estrito + Component Pattern (`pages/` & `pages/components/`)
- **Single Responsibility Principle (SRP):** Cada tela da aplicação possui sua própria classe em `pages/`, enquanto elementos transversais (Header, SideMenu, Footer, ErrorBanner) residem em `pages/components/`.
- **Encapsulamento:** Propriedades declaradas como `readonly name: Locator;` e métodos enxutos (`< 20 linhas`) com retorno explícito `Promise<void>`.

## 2. Custom Fixtures Multi-Page & Components (`fixtures/pom.fixture.ts`)
- Utiliza `base.extend<SwagLabsFixtures>()` para injetar páginas (`loginPage`, `inventoryPage`, `productDetailPage`, `cartPage`, `checkoutInformationPage`, `checkoutOverviewPage`, `checkoutCompletePage`) e componentes (`header`, `sideMenu`, `footer`) diretamente na assinatura dos testes.
- Elimina qualquer `new Page(page)` nos arquivos `.spec.ts`.

## 3. Massa de Dados Tipada e Parametrizada (`test-data/` & `utils/env.ts`)
- Contratos TypeScript centralizados em `test-data/types.ts` (`UserCredentials`, `Product`, `Customer`, `OrderSummary`).
- Constantes de texto e mensagens de erro centralizadas em `test-data/app-content.ts` (`ERROR_MESSAGES`, `PAGE_TITLES`, `CHECKOUT_TEXTS`).
- Credenciais carregadas via helper `getEnv()` (`utils/env.ts`) com fallback seguro para execução local e CI.

## 4. Categorização por Tags e Setup Desacoplado (`tests/*.spec.ts`)
- Uso de `test.beforeEach` para pré-condições repetitivas de rota/autenticação.
- Uso de tags nativas (`{ tag: ['@smoke', '@regression', '@negative'] }`) para execução seletiva em pipelines CI/CD (`--grep`).
