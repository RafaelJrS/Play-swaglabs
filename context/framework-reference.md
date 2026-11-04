# Framework Reference

- **Test Runner:** `@playwright/test` (sem frameworks extras acoplados)
- **Browser Alvo:** Chromium (`Desktop Chrome`)
- **Base URL:** `https://www.saucedemo.com` (sobrescritível via `BASE_URL`)
- **Timeouts:**
  - Global test timeout: `5000ms` (5 segundos)
  - Expect timeout: `5000ms`
  - Action & Navigation timeout: `5000ms`
- **Playwright Test Agents & MCP:**
  - Suporte a `@playwright/mcp` (`npx @playwright/mcp@latest`)
  - Suporte a Playwright Test Agents (`npx playwright init-agents --loop=vscode`)

