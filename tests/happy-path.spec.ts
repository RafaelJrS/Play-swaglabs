// spec: specs/swaglabs-happy-path.md
// seed: tests/seed.spec.ts

import { test } from '../fixtures/pom.fixture';
import { USERS } from '../test-data/users';
import { PRODUCTS, CUSTOMER } from '../test-data/checkout';

test.describe('Swag Labs - Jornadas de Sucesso (Happy Path)', () => {
  test('CT01 - Autenticação e Logout pelo Menu Lateral', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.expectLoginPageLoaded();

    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);

    await loginPage.logout();
    await loginPage.expectLoginPageLoaded();
  });

  test('CT02 - Navegação no Catálogo e Ordenação de Produtos (A-Z, Z-A, Menor e Maior Preço)', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);

    await inventoryPage.expectFirstProduct(PRODUCTS.backpack.name, PRODUCTS.backpack.price);

    await inventoryPage.sortBy('za');
    await inventoryPage.expectFirstProduct(PRODUCTS.redTShirt.name, PRODUCTS.redTShirt.price);

    await inventoryPage.sortBy('lohi');
    await inventoryPage.expectFirstProduct(PRODUCTS.onesie.name, PRODUCTS.onesie.price);

    await inventoryPage.sortBy('hilo');
    await inventoryPage.expectFirstProduct(PRODUCTS.fleeceJacket.name, PRODUCTS.fleeceJacket.price);
  });

  test('CT03 - Inspeção de Detalhes do Produto, Adição ao Carrinho e Retorno ao Catálogo', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);

    await inventoryPage.openProductDetails(PRODUCTS.backpack.name);
    await inventoryPage.expectProductDetailLoaded(PRODUCTS.backpack.name, PRODUCTS.backpack.price);

    await inventoryPage.addFromDetailsAndVerify();
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.backToCatalog();
    await inventoryPage.expectCartBadgeCount(1);
  });

  test('CT04 - Gestão do Carrinho (Adicionar Múltiplos Itens, Remover Item e Continuar Comprando)', async ({
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);

    await inventoryPage.addProductBySlug(PRODUCTS.backpack.slug);
    await inventoryPage.addProductBySlug(PRODUCTS.bikeLight.slug);
    await inventoryPage.expectCartBadgeCount(2);

    await inventoryPage.goToCart();
    await cartPage.expectCartLoaded(2);
    await cartPage.expectProductInCart(PRODUCTS.backpack.name);
    await cartPage.expectProductInCart(PRODUCTS.bikeLight.name);

    await cartPage.removeProductBySlug(PRODUCTS.bikeLight.slug);
    await cartPage.expectCartLoaded(1);
    await inventoryPage.expectCartBadgeCount(1);

    await cartPage.continueShopping();
    await inventoryPage.expectCatalogLoaded(6);
  });

  test('CT05 - Fluxo E2E Completo de Compra (Login -> Catálogo -> Carrinho -> Checkout Step 1 -> Step 2 -> Pedido Concluído -> Back Home)', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectCatalogLoaded(6);

    await inventoryPage.addProductBySlug(PRODUCTS.backpack.slug);
    await inventoryPage.addProductBySlug(PRODUCTS.bikeLight.slug);
    await inventoryPage.expectCartBadgeCount(2);

    await inventoryPage.goToCart();
    await cartPage.expectCartLoaded(2);

    await cartPage.proceedToCheckout();
    await checkoutPage.expectStepOneLoaded();

    await checkoutPage.fillCustomerInfoAndContinue(
      CUSTOMER.firstName,
      CUSTOMER.lastName,
      CUSTOMER.postalCode
    );
    await checkoutPage.expectOverviewLoaded('Item total: $39.98', 'Tax: $3.20', 'Total: $43.18');

    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();

    await checkoutPage.backToHome();
    await inventoryPage.expectCatalogLoaded(6);
    await inventoryPage.expectCartBadgeCount(0);
  });
});

