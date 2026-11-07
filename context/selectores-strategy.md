# Selectors Strategy

1. **Prioridade 1 (Atributos Dedicados de Teste):** No Swag Labs (`saucedemo.com`), todos os controles interativos primários expõem o atributo `data-test`:
   - Autenticação: `[data-test="username"]`, `[data-test="password"]`, `[data-test="login-button"]`, `[data-test="error"]`, `[data-test="error-button"]`.
   - Navegação/Header: `[data-test="title"]`, `[data-test="shopping-cart-link"]`, `[data-test="shopping-cart-badge"]`, `[data-test="product-sort-container"]`.
   - Catálogo e Carrinho: `[data-test="inventory-item"]`, `[data-test="inventory-item-name"]`, `[data-test="inventory-item-price"]`, `[data-test="add-to-cart-<slug>"]`, `[data-test="remove-<slug>"]`.
   - Checkout: `[data-test="firstName"]`, `[data-test="lastName"]`, `[data-test="postalCode"]`, `[data-test="continue"]`, `[data-test="cancel"]`, `[data-test="finish"]`, `[data-test="complete-header"]`.
2. **Prioridade 2 (Acessibilidade / ARIA Roles):** Utilizado quando o elemento é semântico ou validado via `browser_snapshot`:
   - Menu lateral: `getByRole('button', { name: 'Open Menu' })`, `getByRole('button', { name: 'Close Menu' })`.
   - Links de redes sociais no rodapé: `getByRole('link', { name: 'X', exact: true })`, `getByRole('link', { name: 'Facebook' })`, `getByRole('link', { name: 'LinkedIn' })`.
3. **Proibições Estritas:** Zero XPaths absolutos, zero seletores CSS acoplados a estilização e zero seletores soltos dentro de arquivos `tests/*.spec.ts`.
