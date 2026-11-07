# Framework Reference

- **Test Runner:** `@playwright/test` (`^1.64.1`) com TypeScript estrito (`tsconfig.json` `strict: true`)
- **Browser Alvo:**
  - **Local:** Google Chrome (`channel: 'chrome'`, `headless: false`, `slowMo: 600`)
  - **CI (`process.env.CI`):** Chromium Headless (`headless: true`, `slowMo: 0`, `workers: 1`, `retries: 2`)
- **Base URL:** `https://www.saucedemo.com` (sobrescritível via `BASE_URL` utilizando `utils/env.ts`)
- **Timeouts:**
  - Global test timeout: `60000ms` (60 segundos)
  - Expect timeout: `10000ms` (absorve `performance_glitch_user` sem sleeps fixos)
  - Action & Navigation timeout: `10000ms` / `15000ms`
- **Scripts NPM (`package.json`):**
  - `npm test`: Executa toda a suíte E2E
  - `npm run test:smoke`: Executa cenários `@smoke`
  - `npm run test:negative`: Executa cenários `@negative`
  - `npm run test:regression`: Executa cenários `@regression`
  - `npm run typecheck`: Validação estática `tsc --noEmit`
- **Playwright Test Agents & MCP:**
  - Servidor `playwright`: `npx -y @playwright/mcp@latest`
  - Servidor `playwright-test`: `npx playwright run-test-mcp-server`
