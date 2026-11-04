# Lessons Learned

- **Timeout Estrito de 5s:** Definido `timeout: 5000`, `expect.timeout: 5000`, `actionTimeout: 5000` e `navigationTimeout: 5000` em `playwright.config.ts` para feedback rápido e detecção imediata de gargalos.
- **Execução Enxuta em CI:** Instalação restrita ao binário Chromium (`npx playwright install --with-deps chromium`) reduz drasticamente o tempo de provisionamento no GitHub Actions.

