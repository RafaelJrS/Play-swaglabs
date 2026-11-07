import { test } from '../fixtures/pom.fixture';
import { ERROR_MESSAGES } from '../test-data/app-content';
import { USERS } from '../test-data/users';

test.describe('Swag Labs - Autenticação', { tag: ['@smoke', '@auth'] }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Deve realizar login com sucesso usando usuário padrão', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectCatalogLoaded();
  });

  test('Deve exibir mensagem de erro para usuário bloqueado', async ({ loginPage }) => {
    await loginPage.loginAs(USERS.lockedOut);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.lockedOut);
  });
});
