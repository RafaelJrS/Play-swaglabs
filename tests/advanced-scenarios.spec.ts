// spec: specs/swaglabs-advanced-scenarios.md
// seed: tests/seed.spec.ts

import { test } from '../fixtures/pom.fixture';
import { USERS, ERROR_MESSAGES } from '../test-data/users';
import { PRODUCTS, ALL_PRODUCT_SLUGS, CUSTOMER } from '../test-data/checkout';

test.describe('Swag Labs - Cenários Avançados, Persistência, Rodapé e Personas', () => {
  test('CT01 - Menu Lateral: Reset App State deve limpar o carrinho imediatamente', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);

    await inventoryPage.addProductBySlug(PRODUCTS.backpack.slug);
    await inventoryPage.addProductBySlug(PRODUCTS.bikeLight.slug);
    await inventoryPage.expectCartBadgeCount(2);

    await loginPage.resetAppState();
    await inventoryPage.expectCartBadgeCount(0);
  });

  test('CT02 - Menu Lateral: Validar link About e retornar ao catálogo via All Items a partir do Carrinho', async ({
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.goToCart();
    await cartPage.expectCartLoaded(0);

    await loginPage.expectAboutLinkAndNavigateToAllItems();
    await inventoryPage.expectCatalogLoaded(6);
  });

  test('CT03 - Capacidade Máxima: Compra E2E com todos os 6 produtos do catálogo e validação da soma total ($140.34)', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);

    for (const slug of ALL_PRODUCT_SLUGS) {
      await inventoryPage.addProductBySlug(slug);
    }
    await inventoryPage.expectCartBadgeCount(6);

    await inventoryPage.goToCart();
    await cartPage.expectCartLoaded(6);

    await cartPage.proceedToCheckout();
    await checkoutPage.expectStepOneLoaded();
    await checkoutPage.fillCustomerInfoAndContinue(
      CUSTOMER.firstName,
      CUSTOMER.lastName,
      CUSTOMER.postalCode
    );

    await checkoutPage.expectOverviewLoaded('Item total: $129.94', 'Tax: $10.40', 'Total: $140.34');
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('CT04 - Cancelamento no Checkout Step 2 (Overview) deve retornar ao catálogo mantendo itens no carrinho', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.addProductBySlug(PRODUCTS.backpack.slug);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfoAndContinue(
      CUSTOMER.firstName,
      CUSTOMER.lastName,
      CUSTOMER.postalCode
    );
    await checkoutPage.expectOverviewLoaded('Item total: $29.99', 'Tax: $2.40', 'Total: $32.39');

    await checkoutPage.cancelFromOverview();
    await inventoryPage.expectCatalogLoaded(6);
    await inventoryPage.expectCartBadgeCount(1);
  });

  test('CT05 - Persistência de Sessão: Recarregar a página (Reload/F5) deve manter os produtos no carrinho', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.addProductBySlug(PRODUCTS.backpack.slug);
    await inventoryPage.addProductBySlug(PRODUCTS.onesie.slug);
    await inventoryPage.expectCartBadgeCount(2);

    await inventoryPage.reloadCatalog();
    await inventoryPage.expectCatalogLoaded(6);
    await inventoryPage.expectCartBadgeCount(2);
  });

  test('CT06 - Auth Guard Completo: Bloquear acesso direto sem login ao Carrinho (/cart.html) e ao Checkout (/checkout-step-one.html)', async ({
    loginPage,
  }) => {
    await loginPage.gotoProtectedRoute('/cart.html');
    await loginPage.expectLoginPageLoaded();
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.unauthorizedCart);

    await loginPage.gotoProtectedRoute('/checkout-step-one.html');
    await loginPage.expectLoginPageLoaded();
    await loginPage.expectErrorMessage(ERROR_MESSAGES.login.unauthorizedCheckout);
  });

  test('CT07 - Rodapé (Footer): Validar links de redes sociais (X/Twitter, Facebook, LinkedIn) e aviso de Copyright', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);
    await inventoryPage.expectFooterLinksAndCopyright();
  });

  test('CT08 - Persona Especial: performance_glitch_user deve autenticar e carregar o catálogo resiliando à alta latência', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.performanceGlitch.username, USERS.performanceGlitch.password);
    await inventoryPage.expectCatalogLoaded(6);
    await loginPage.logout();
    await loginPage.expectLoginPageLoaded();
  });

  test('CT09 - Persona Especial: problem_user deve exibir a anomalia conhecida de imagem 404 nos produtos do catálogo', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.problem.username, USERS.problem.password);
    await inventoryPage.expectCatalogLoaded(6);
    await inventoryPage.expectBackpackImageSrcContains('sl-404');
  });
});

