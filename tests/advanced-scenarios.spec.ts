// spec: specs/swaglabs-advanced-scenarios.md
// seed: tests/seed.spec.ts

import { test } from '../fixtures/pom.fixture';
import { USERS } from '../test-data/users';
import { PRODUCTS, ALL_PRODUCTS, CUSTOMER, ORDER_SUMMARIES } from '../test-data/checkout';
import { ERROR_MESSAGES, EXTERNAL_LINKS, FOOTER_COPYRIGHT } from '../test-data/app-content';

test.describe('Swag Labs - Cenários Avançados, Persistência, Rodapé e Personas', { tag: '@regression' }, () => {
  test('CT01 - Menu Lateral: Reset App State deve limpar o carrinho imediatamente', async ({
    loginPage,
    inventoryPage,
    sideMenu,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.addProductsToCart([PRODUCTS.backpack, PRODUCTS.bikeLight]);
    await header.expectCartBadgeCount(2);

    await sideMenu.resetAppState();
    await header.expectCartBadgeCount(0);
  });

  test('CT02 - Menu Lateral: Validar link About e retornar ao catálogo via All Items a partir do Carrinho', async ({
    loginPage,
    inventoryPage,
    cartPage,
    sideMenu,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await header.goToCart();
    await cartPage.expectCartLoaded(0);

    await sideMenu.open();
    await sideMenu.expectAboutLinkHref(EXTERNAL_LINKS.about);
    await sideMenu.goToAllItems();
    await inventoryPage.expectCatalogLoaded();
  });

  test('CT03 - Capacidade Máxima: Compra E2E com todos os 6 produtos do catálogo e validação da soma total ($140.34)', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.addProductsToCart(ALL_PRODUCTS);
    await header.expectCartBadgeCount(ALL_PRODUCTS.length);

    await header.goToCart();
    await cartPage.expectCartLoaded(ALL_PRODUCTS.length);
    await cartPage.proceedToCheckout();

    await checkoutInformationPage.expectLoaded();
    await checkoutInformationPage.submitCustomerInfo(CUSTOMER);

    await checkoutOverviewPage.expectLoaded(ORDER_SUMMARIES.allProducts);
    await checkoutOverviewPage.finish();
    await checkoutCompletePage.expectLoaded();
  });

  test('CT04 - Cancelamento no Checkout Step 2 (Overview) deve retornar ao catálogo mantendo itens no carrinho', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await header.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.submitCustomerInfo(CUSTOMER);
    await checkoutOverviewPage.expectLoaded(ORDER_SUMMARIES.backpack);

    await checkoutOverviewPage.cancel();
    await inventoryPage.expectCatalogLoaded();
    await header.expectCartBadgeCount(1);
  });

  test('CT05 - Persistência de Sessão: Recarregar a página (Reload/F5) deve manter os produtos no carrinho', async ({
    loginPage,
    inventoryPage,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.addProductsToCart([PRODUCTS.backpack, PRODUCTS.onesie]);
    await header.expectCartBadgeCount(2);

    await inventoryPage.reload();
    await inventoryPage.expectCatalogLoaded();
    await header.expectCartBadgeCount(2);
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
    footer,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectCatalogLoaded();
    await footer.expectSocialLinks(EXTERNAL_LINKS);
    await footer.expectCopyright(FOOTER_COPYRIGHT);
  });

  test('CT08 - Persona Especial: performance_glitch_user deve autenticar e carregar o catálogo resistindo à alta latência', async ({
    loginPage,
    inventoryPage,
    sideMenu,
  }) => {
    await loginPage.loginAs(USERS.performanceGlitch);
    await inventoryPage.expectCatalogLoaded();
    await sideMenu.logout();
    await loginPage.expectLoginPageLoaded();
  });

  test('CT09 - Persona Especial: problem_user deve exibir a anomalia conhecida de imagem 404 nos produtos do catálogo', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginAs(USERS.problem);
    await inventoryPage.expectCatalogLoaded();
    await inventoryPage.expectProductImageSrcContains(PRODUCTS.backpack, 'sl-404');
  });
});
