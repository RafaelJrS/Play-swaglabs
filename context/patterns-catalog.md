# Patterns Catalog

## 1. Page Object Model (Playwright)
- Construtor declara `readonly` `Locator`s usando `page.locator('[data-test="..."]')`.
- Métodos de ação e asserção encapsulados com menos de 20 linhas e tipagem explícita (`Promise<void>`).

## 2. Custom Fixtures Multi-Page (`fixtures/pom.fixture.ts`)
- Utiliza `base.extend<SwagLabsFixtures>()` para injetar `loginPage`, `inventoryPage`, `cartPage` e `checkoutPage` diretamente na assinatura dos testes (`async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => ...`), eliminando instanciações repetitivas (`new Page(page)`) dentro dos arquivos `.spec.ts`.
