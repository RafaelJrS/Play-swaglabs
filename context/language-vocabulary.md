# Language Vocabulary

## Autenticação e Sessão (`LoginPage`)
- `goto()`: Navega para a página inicial (`/`).
- `expectLoginPageLoaded()`: Valida URL inicial e visibilidade dos campos `username`, `password` e botão `login`.
- `login(username, password)`: Preenche credenciais e submete o formulário de login.
- `logout()`: Abre o menu lateral (`Open Menu`) e aciona `Logout` (`[data-test="logout-sidebar-link"]`).
- `expectInventoryLoaded()`: Valida redirecionamento para `/inventory.html` e título `Products`.
- `expectErrorMessage(expectedText)`: Valida visibilidade e conteúdo do alerta de erro de autenticação.

## Catálogo e Detalhes de Produto (`InventoryPage`)
- `expectCatalogLoaded(expectedCount)`: Valida URL `/inventory.html`, título `Products` e quantidade de itens listados (padrão `6`).
- `sortBy(optionValue)`: Ordena produtos pelo seletor `[data-test="product-sort-container"]` (`az`, `za`, `lohi`, `hilo`).
- `expectFirstProduct(expectedName, expectedPrice)`: Valida nome e preço do primeiro item listado após ordenação.
- `openProductDetails(productName)`: Clica no nome do produto e valida redirecionamento para `/inventory-item.html` com botão `Back to products`.
- `expectProductDetailLoaded(expectedName, expectedPrice)`: Valida nome e preço na página de detalhes do produto.
- `addFromDetailsAndVerify()`: Adiciona o item na tela de detalhes (`[data-test="add-to-cart"]`) e verifica mudança do botão para `Remove`.
- `backToCatalog()`: Retorna da tela de detalhes para `/inventory.html` (`[data-test="back-to-products"]`).
- `addProductBySlug(productSlug)`: Adiciona item diretamente pelo catálogo via `[data-test="add-to-cart-<slug>"]` e valida estado `remove-<slug>`.
- `expectCartBadgeCount(count)`: Valida o contador do badge do carrinho (`[data-test="shopping-cart-badge"]`) ou sua ocultação quando `count === 0`.
- `goToCart()`: Navega para o carrinho (`[data-test="shopping-cart-link"]`).

## Carrinho de Compras (`CartPage`)
- `expectCartLoaded(expectedItemCount)`: Valida URL `/cart.html`, título `Your Cart` e quantidade de produtos no carrinho.
- `expectProductInCart(productName)`: Valida presença do produto listado no carrinho.
- `removeProductBySlug(productSlug)`: Remove um produto do carrinho (`[data-test="remove-<slug>"]`).
- `continueShopping()`: Clica em `Continue Shopping` (`[data-test="continue-shopping"]`) e retorna ao catálogo.
- `proceedToCheckout()`: Clica em `Checkout` (`[data-test="checkout"]`).

## Fluxo de Checkout (`CheckoutPage`)
- `expectStepOneLoaded()`: Valida URL `/checkout-step-one.html` e título `Checkout: Your Information`.
- `fillCustomerInfoAndContinue(firstName, lastName, postalCode)`: Preenche dados do comprador e avança (`[data-test="continue"]`).
- `expectOverviewLoaded(expectedSubtotal, expectedTax, expectedTotal)`: Valida URL `/checkout-step-two.html`, título `Checkout: Overview`, `SauceCard #31337`, `Free Pony Express Delivery!` e valores financeiros.
- `finishOrder()`: Finaliza o pedido (`[data-test="finish"]`).
- `expectOrderComplete()`: Valida URL `/checkout-complete.html`, título `Checkout: Complete!`, header `Thank you for your order!` e mensagem de despacho.
- `backToHome()`: Clica em `Back Home` (`[data-test="back-to-products"]`) retornando ao catálogo.
