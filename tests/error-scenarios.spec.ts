// spec: specs/swaglabs-error-scenarios.md
// seed: tests/seed.spec.ts

import { test } from '../fixtures/pom.fixture';
import { USERS } from '../test-data/users';
import { CUSTOMER } from '../test-data/checkout';
import { ERROR_MESSAGES } from '../test-data/app-content';

test.describe('Swag Labs - Validações de Erro, Restrições e Carrinho Vazio', { tag: '@negative' }, () => {
  test('CT01 - Deve exibir erro ao tentar login sem preencher o campo Username', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', USERS.standard.password);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.usernameRequired);
  });

  test('CT02 - Deve exibir erro ao tentar login sem preencher o campo Password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, '');
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.passwordRequired);
  });

  test('CT03 - Deve exibir erro ao tentar login com senha errada ou credenciais inválidas', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.invalid.password);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.invalidCredentials);
  });

  test('CT04 - Deve exibir erro para usuário bloqueado e permitir fechar o alerta de erro (X)', async ({
    loginPage,
  }) => {
    await loginPage.loginAs(USERS.lockedOut);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.lockedOut);
    await loginPage.dismissErrorMessage();
  });

  test('CT05 - Deve bloquear acesso direto ao catálogo (/inventory.html) sem autenticação', async ({ loginPage }) => {
    await loginPage.gotoProtectedRoute('/inventory.html');
    await loginPage.expectLoginPageLoaded();
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.unauthorizedInventory);
  });

  test('CT06 - Deve validar o estado do carrinho vazio (sem produtos adicionados)', async ({
    loginPage,
    inventoryPage,
    cartPage,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectCatalogLoaded();
    await header.expectCartBadgeCount(0);

    await header.goToCart();
    await cartPage.expectCartLoaded(0);
    await header.expectCartBadgeCount(0);
  });

  test.describe('Checkout Step One - Campos Obrigatórios', () => {
    test.beforeEach(async ({ loginPage, header, cartPage, checkoutInformationPage }) => {
      await loginPage.loginAs(USERS.standard);
      await header.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutInformationPage.expectLoaded();
    });

    test('CT07 - Deve exibir erro no Checkout ao avançar sem preencher First Name (Nome obrigatório)', async ({
      checkoutInformationPage,
    }) => {
      await checkoutInformationPage.submitCustomerInfo({ ...CUSTOMER, firstName: '' });
      await checkoutInformationPage.expectErrorMessage(ERROR_MESSAGES.checkout.firstNameRequired);
    });

    test('CT08 - Deve exibir erro no Checkout ao avançar sem preencher Last Name (Sobrenome obrigatório)', async ({
      checkoutInformationPage,
    }) => {
      await checkoutInformationPage.submitCustomerInfo({ ...CUSTOMER, lastName: '' });
      await checkoutInformationPage.expectErrorMessage(ERROR_MESSAGES.checkout.lastNameRequired);
    });

    test('CT09 - Deve exibir erro no Checkout sem Postal Code (CEP/Cadastro), fechar o alerta e cancelar retorno ao carrinho', async ({
      checkoutInformationPage,
      cartPage,
    }) => {
      await checkoutInformationPage.submitCustomerInfo({ ...CUSTOMER, postalCode: '' });
      await checkoutInformationPage.expectErrorMessage(ERROR_MESSAGES.checkout.postalCodeRequired);

      await checkoutInformationPage.dismissErrorMessage();
      await checkoutInformationPage.cancel();
      await cartPage.expectCartLoaded(0);
    });
  });
});
