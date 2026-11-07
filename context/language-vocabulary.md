# Language Vocabulary

## Componentes Transversais (`pages/components/`)

### `ErrorBannerComponent`
- `expectVisibleWithText(expectedText)`: Valida visibilidade e texto exato de `[data-test="error"]`.
- `dismiss()`: Clica no botão `X` (`[data-test="error-button"]`) e valida que o banner ficou oculto (`toBeHidden()`).

### `HeaderComponent`
- `expectTitle(expectedTitle)`: Valida visibilidade e texto de `[data-test="title"]`.
- `expectCartBadgeCount(count)`: Valida quantidade no badge (`[data-test="shopping-cart-badge"]`) ou sua ocultação quando `count === 0`.
- `goToCart()`: Clica no ícone do carrinho (`[data-test="shopping-cart-link"]`).

### `SideMenuComponent`
- `open()`: Abre o menu hambúrguer (`Open Menu`) e aguarda os links ficarem visíveis.
- `close()`: Fecha o menu lateral (`Close Menu`) e aguarda ocultação.
- `logout()`: Abre o menu lateral e clica em `Logout` (`[data-test="logout-sidebar-link"]`).
- `resetAppState()`: Abre o menu lateral, aciona `Reset App State` (`[data-test="reset-sidebar-link"]`) e fecha o menu.
- `expectAboutLinkAndSelectAllItems()`: Valida o `href` externo de `About` (`https://saucelabs.com/`) e clica em `All Items` (`[data-test="inventory-sidebar-link"]`).

### `FooterComponent`
- `expectSocialLinksAndCopyright()`: Valida os links `X`, `Facebook` e `LinkedIn` via Role ARIA e o texto de copyright (`[data-test="footer-copy"]`).

---

## Page Objects (`pages/`)

### 1. `LoginPage` (`/`)
- `goto()`: Navega para a página inicial (`/`).
- `gotoProtectedRoute(route)`: Tenta acessar diretamente uma rota interna sem sessão.
- `expectLoaded()`: Valida URL inicial e visibilidade dos campos `username`, `password` e botão `login`.
- `login(username, password)`: Preenche credenciais brutas e submete o formulário.
- `loginAs(credentials)`: Realiza login recebendo um objeto tipado `UserCredentials`.
- `expectErrorMessage(expectedText)`: Delega ao `ErrorBannerComponent` a validação da mensagem de erro.
- `dismissErrorMessage()`: Delega ao `ErrorBannerComponent` o fechamento do alerta de erro (`X`).

### 2. `InventoryPage` (`/inventory.html`)
- `expectCatalogLoaded(expectedCount)`: Valida URL `/inventory.html`, título `Products` e total de cards renderizados (padrão `6`).
- `sortBy(optionValue)`: Ordena catálogo via `[data-test="product-sort-container"]` (`az`, `za`, `lohi`, `hilo`).
- `expectFirstProduct(expectedName, expectedPrice)`: Valida nome e preço do primeiro item listado.
- `openProductDetails(productName)`: Clica no título de um produto para abrir sua página de detalhes.
- `addProductBySlug(productSlug)`: Clica em `[data-test="add-to-cart-<slug>"]` e confirma mudança para `[data-test="remove-<slug>"]`.
- `removeProductBySlug(productSlug)`: Clica em `[data-test="remove-<slug>"]` no catálogo e confirma retorno para `Add to cart`.
- `reloadCatalog()`: Recarrega a página (`page.reload()`) para testes de persistência de sessão.
- `expectBackpackImageSrcContains(expectedSubstring)`: Inspeciona o atributo `src` da imagem da mochila (detecção de anomalias visuais do `problem_user`).

### 3. `ProductDetailPage` (`/inventory-item.html`)
- `expectLoaded(expectedName, expectedPrice)`: Valida URL `/inventory-item.html`, botão `Back to products`, nome e preço do item.
- `addToCart()`: Adiciona o item ao carrinho (`[data-test="add-to-cart"]`) e valida botão `Remove`.
- `removeFromCart()`: Remove o item na tela de detalhes (`[data-test="remove"]`) e valida retorno do botão `Add to cart`.
- `backToProducts()`: Retorna ao catálogo (`[data-test="back-to-products"]`).

### 4. `CartPage` (`/cart.html`)
- `expectLoaded(expectedItemCount)`: Valida URL `/cart.html`, título `Your Cart` e contagem de itens no carrinho (`0` a `6`).
- `expectProductInCart(productName)`: Valida visibilidade de um produto específico no carrinho.
- `removeProductBySlug(productSlug)`: Remove um item do carrinho (`[data-test="remove-<slug>"]`).
- `continueShopping()`: Retorna ao catálogo (`[data-test="continue-shopping"]`).
- `proceedToCheckout()`: Avança para o Checkout Step One (`[data-test="checkout"]`).

### 5. `CheckoutInformationPage` (`/checkout-step-one.html`)
- `expectLoaded()`: Valida URL `/checkout-step-one.html` e título `Checkout: Your Information`.
- `fillInformationAndContinue(firstName, lastName, postalCode)`: Preenche formulário cadastral e clica em `Continue`.
- `fillCustomerAndContinue(customer)`: Preenche formulário recebendo objeto `Customer` tipado.
- `expectErrorMessage(expectedText)`: Valida mensagem de erro cadastral via `ErrorBannerComponent`.
- `dismissErrorMessage()`: Fecha o alerta de erro cadastral via `ErrorBannerComponent`.
- `cancel()`: Clica em `Cancel` (`[data-test="cancel"]`) e valida retorno para `/cart.html`.

### 6. `CheckoutOverviewPage` (`/checkout-step-two.html`)
- `expectLoaded(summary)`: Valida URL `/checkout-step-two.html`, título `Checkout: Overview`, `SauceCard #31337`, `Free Pony Express Delivery!` e valores financeiros (`OrderSummary`).
- `finishOrder()`: Clica em `Finish` (`[data-test="finish"]`).
- `cancel()`: Clica em `Cancel` (`[data-test="cancel"]`) e valida retorno ao catálogo (`/inventory.html`).

### 7. `CheckoutCompletePage` (`/checkout-complete.html`)
- `expectOrderComplete()`: Valida URL `/checkout-complete.html`, título `Checkout: Complete!`, header `Thank you for your order!`, texto de despacho e ícone Pony Express.
- `backHome()`: Clica em `Back Home` (`[data-test="back-to-products"]`) retornando ao catálogo.
