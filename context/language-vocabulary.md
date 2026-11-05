# Language Vocabulary

## Autenticação, Sessão e Menu Lateral (`LoginPage`)
- `goto()`: Navega para a página inicial (`/`).
- `gotoProtectedRoute(route)`: Tenta navegar diretamente para uma rota protegida (ex.: `/inventory.html`, `/cart.html`, `/checkout-step-one.html`) sem autenticação prévia.
- `expectLoginPageLoaded()`: Valida URL inicial e visibilidade dos campos `username`, `password` e botão `login`.
- `login(username, password)`: Preenche credenciais e submete o formulário de login.
- `logout()`: Abre o menu lateral (`Open Menu`) e aciona `Logout` (`[data-test="logout-sidebar-link"]`).
- `resetAppState()`: Abre o menu lateral, aciona `Reset App State` (`[data-test="reset-sidebar-link"]`) limpando o estado do carrinho em memória e fecha o menu.
- `expectAboutLinkAndNavigateToAllItems()`: Abre o menu lateral, valida o atributo `href="https://saucelabs.com/"` do link `About` e navega de volta ao catálogo clicando em `All Items` (`[data-test="inventory-sidebar-link"]`).
- `expectInventoryLoaded()`: Valida redirecionamento para `/inventory.html` e título `Products`.
- `expectErrorMessage(expectedText)`: Valida visibilidade e conteúdo do alerta de erro de autenticação (`[data-test="error"]`).
- `dismissErrorMessage()`: Clica no botão `X` (`[data-test="error-button"]`) do alerta de erro de login e valida que o banner desapareceu (`toBeHidden()`).

## Catálogo, Detalhes de Produto e Rodapé (`InventoryPage`)
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
- `reloadCatalog()`: Executa `page.reload()` para validar persistência de sessão e `localStorage`.
- `expectFooterLinksAndCopyright()`: Valida os links de redes sociais (`X`, `Facebook`, `LinkedIn`) via Role ARIA e o texto de copyright (`[data-test="footer-copy"]`).
- `expectBackpackImageSrcContains(expectedSubstring)`: Valida o atributo `src` da imagem do produto principal (útil para detectar anomalias como `sl-404` no `problem_user`).

## Carrinho de Compras (`CartPage`)
- `expectCartLoaded(expectedItemCount)`: Valida URL `/cart.html`, título `Your Cart` e quantidade de produtos no carrinho (suporta `0` para carrinho vazio até `6` para capacidade máxima).
- `expectProductInCart(productName)`: Valida presença do produto listado no carrinho.
- `removeProductBySlug(productSlug)`: Remove um produto do carrinho (`[data-test="remove-<slug>"]`).
- `continueShopping()`: Clica em `Continue Shopping` (`[data-test="continue-shopping"]`) e retorna ao catálogo.
- `proceedToCheckout()`: Clica em `Checkout` (`[data-test="checkout"]`).

## Fluxo de Checkout (`CheckoutPage`)
- `expectStepOneLoaded()`: Valida URL `/checkout-step-one.html` e título `Checkout: Your Information`.
- `fillCustomerInfoAndContinue(firstName, lastName, postalCode)`: Preenche dados do comprador e avança (`[data-test="continue"]`).
- `expectCheckoutError(expectedText)`: Valida visibilidade e texto exato do alerta de erro de validação cadastral no Checkout (`[data-test="error"]`).
- `dismissCheckoutError()`: Clica no botão `X` (`[data-test="error-button"]`) do erro de Checkout e valida ocultação do alerta.
- `cancelCheckout()`: Clica no botão `Cancel` (`[data-test="cancel"]`) no Step One e valida retorno a `/cart.html`.
- `cancelFromOverview()`: Clica no botão `Cancel` (`[data-test="cancel"]`) no Step Two (`Checkout: Overview`) e valida retorno direto a `/inventory.html` mantendo os itens no carrinho.
- `expectOverviewLoaded(expectedSubtotal, expectedTax, expectedTotal)`: Valida URL `/checkout-step-two.html`, título `Checkout: Overview`, `SauceCard #31337`, `Free Pony Express Delivery!` e valores financeiros.
- `finishOrder()`: Finaliza o pedido (`[data-test="finish"]`).
- `expectOrderComplete()`: Valida URL `/checkout-complete.html`, título `Checkout: Complete!`, header `Thank you for your order!` e mensagem de despacho.
- `backToHome()`: Clica em `Back Home` (`[data-test="back-to-products"]`) retornando ao catálogo.
