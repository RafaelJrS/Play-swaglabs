import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../test-data/users';

test.describe('Swag Labs - Autenticação', () => {
  test('Deve realizar login com sucesso usando usuário padrão', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await loginPage.expectInventoryLoaded();
  });

  test('Deve exibir mensagem de erro para usuário bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });
});

