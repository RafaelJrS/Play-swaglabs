# Selectors Strategy

1. **Prioridade 1 (Atributos de Teste):** No Swag Labs (`saucedemo.com`), os elementos utilizam o atributo `data-test` (ex: `[data-test="username"]`, `[data-test="login-button"]`).
2. **Prioridade 2 (Acessibilidade / Roles):** `getByRole`, `getByLabel`, `getByPlaceholder`.
3. **Proibições:** Zero XPaths absolutos ou seletores CSS acoplados a estilização.

