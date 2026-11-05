# Lessons Learned

- **SLA de Auto-Wait para `performance_glitch_user` (10s):** O perfil `performance_glitch_user` injeta um bloqueio intencional de 5000ms na transição de login. Com `slowMo: 600` ativo para visualização, `actionTimeout: 10000` e `expect.timeout: 10000` permitem absorver essa latência nativamente via *Auto-Wait*, sem qualquer `waitForTimeout` estático.
- **Self-Healing de Links Sociais no Rodapé (ARIA Role vs `data-test`):** O Swag Labs atualizou o antigo link do Twitter para `X` (`https://x.com/saucelabs`) na árvore de acessibilidade (`getByRole('link', { name: 'X' })`, `Facebook`, `LinkedIn`). O uso de `getByRole('link', ...)` validado pelo snapshot do Healer garantiu resiliência sem depender de classes CSS.
- **Execução Enxuta em CI:** Instalação restrita ao binário Chromium (`npx playwright install --with-deps chromium`) reduz drasticamente o tempo de provisionamento no GitHub Actions.
