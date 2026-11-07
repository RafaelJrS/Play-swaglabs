// spec: specs/swaglabs-happy-path.md
// seed: tests/seed.spec.ts

import { test } from '../fixtures/pom.fixture';
import { USERS } from '../test-data/users';
import { PRODUCTS, CUSTOMER, ORDER_SUMMARIES } from '../test-data/checkout';

test.describe('Swag Labs - Jornadas de Sucesso (Happy Path)', { tag: '@smoke' }, () => {
  test('CT01 - Autenticação e Logout pelo Menu Lateral', async ({ loginPage, inventoryPage, sideMenu }) => {
    await loginPage.goto();
    await loginPage.expectLoginPageLoaded();

    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded();

    await sideMenu.logout();
    await loginPage.expectLoginPageLoaded();
  });

  test('CT02 - Navegação no Catálogo e Ordenação de Produtos (A-Z, Z-A, Menor e Maior Preço)', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.expectCatalogLoaded();
    await inventoryPage.expectFirstProduct(PRODUCTS.backpack);

    await inventoryPage.sortBy('za');
    await inventoryPage.expectFirstProduct(PRODUCTS.redTShirt);

    await inventoryPage.sortBy('lohi');
    await inventoryPage.expectFirstProduct(PRODUCTS.onesie);

    await inventoryPage.sortBy('hilo');
    await inventoryPage.expectFirstProduct(PRODUCTS.fleeceJacket);
  });

  test('CT03 - Inspeção de Detalhes do Produto, Adição ao Carrinho e Retorno ao Catálogo', async ({
    loginPage,
    inventoryPage,
    productDetailPage,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.openProductDetails(PRODUCTS.backpack);
    await productDetailPage.expectLoaded(PRODUCTS.backpack);

    await productDetailPage.addToCart();
    await header.expectCartBadgeCount(1);

    await productDetailPage.backToProducts();
    await inventoryPage.expectCatalogLoaded();
    await header.expectCartBadgeCount(1);
  });

  test('CT04 - Gestão do Carrinho (Adicionar Múltiplos Itens, Remover Item e Continuar Comprando)', async ({
    loginPage,
    inventoryPage,
    cartPage,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.addProductsToCart([PRODUCTS.backpack, PRODUCTS.bikeLight]);
    await header.expectCartBadgeCount(2);

    await header.goToCart();
    await cartPage.expectCartLoaded(2);
    await cartPage.expectProductInCart(PRODUCTS.backpack);
    await cartPage.expectProductInCart(PRODUCTS.bikeLight);

    await cartPage.removeProduct(PRODUCTS.bikeLight);
    await cartPage.expectCartLoaded(1);
    await header.expectCartBadgeCount(1);

    await cartPage.continueShopping();
    await inventoryPage.expectCatalogLoaded();
  });

  test('CT05 - Fluxo E2E Completo de Compra (Login -> Catálogo -> Carrinho -> Checkout Step 1 -> Step 2 -> Pedido Concluído -> Back Home)', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    header,
  }) => {
    await loginPage.loginAs(USERS.standard);
    await inventoryPage.addProductsToCart([PRODUCTS.backpack, PRODUCTS.bikeLight]);
    await header.expectCartBadgeCount(2);

    await header.goToCart();
    await cartPage.expectCartLoaded(2);
    await cartPage.proceedToCheckout();

    await checkoutInformationPage.expectLoaded();
    await checkoutInformationPage.submitCustomerInfo(CUSTOMER);

    await checkoutOverviewPage.expectLoaded(ORDER_SUMMARIES.backpackAndBikeLight);
    await checkoutOverviewPage.finish();

    await checkoutCompletePage.expectLoaded();
    await checkoutCompletePage.backHome();
    await inventoryPage.expectCatalogLoaded();
    await header.expectCartBadgeCount(0);
  });
});
