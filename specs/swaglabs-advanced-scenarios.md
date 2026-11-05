# Swag Labs — Plano de Testes Avançados (Menu Lateral, Persistência, Capacidade Máxima, Rodapé e Personas)

## Application Overview

Plano de testes cobrindo o Menu Lateral (Reset App State, All Items, About), compra com todos os 6 produtos do catálogo, cancelamento no Checkout Step 2, persistência após Reload (F5), Auth Guard em rotas de carrinho/checkout, links de redes sociais no rodapé e perfis especiais (performance_glitch_user e problem_user).

## Test Scenarios

### 1. Swag Labs - Cenários Avançados, Persistência, Rodapé e Personas

**Seed:** `tests/seed.spec.ts`

#### 1.1. CT01 - Menu Lateral: Reset App State deve limpar o carrinho imediatamente

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Autenticar, adicionar 2 itens, abrir o menu lateral, clicar em Reset App State ([data-test='reset-sidebar-link']) e fechar o menu.
    - expect: O badge do carrinho deve exibir '2' antes do reset e ficar oculto (0 itens) após clicar em Reset App State.

#### 1.2. CT02 - Menu Lateral: Validar link About e retornar ao catálogo via All Items a partir do Carrinho

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Autenticar, ir para o carrinho ('/cart.html'), abrir o menu lateral, validar o atributo href do About e clicar em All Items ([data-test='inventory-sidebar-link']).
    - expect: O link About deve apontar para 'https://saucelabs.com/' e clicar em All Items deve redirecionar de '/cart.html' para '/inventory.html'.

#### 1.3. CT03 - Capacidade Máxima: Compra E2E com todos os 6 produtos do catálogo e validação da soma total ($140.34)

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Autenticar, adicionar todos os 6 produtos, avançar pelo carrinho e Checkout Step 1 até o Step 2 e finalizar a compra.
    - expect: Exibir badge '6', listar 6 itens no carrinho e validar no Checkout Overview: 'Item total: $129.94', 'Tax: $10.40' e 'Total: $140.34', concluindo o pedido.

#### 1.4. CT04 - Cancelamento no Checkout Step 2 (Overview) deve retornar ao catálogo mantendo itens no carrinho

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Adicionar 1 produto, avançar até o Checkout Overview ('/checkout-step-two.html') e clicar em Cancel ([data-test='cancel']).
    - expect: Redirecionar de '/checkout-step-two.html' para '/inventory.html' com título 'Products' e manter o badge do carrinho em '1'.

#### 1.5. CT05 - Persistência de Sessão: Recarregar a página (Reload/F5) deve manter os produtos no carrinho

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Adicionar 2 produtos ao carrinho, executar page.reload() e validar o estado do catálogo e do badge.
    - expect: Continuar em '/inventory.html' e preservar o badge do carrinho com valor '2' após o reload.

#### 1.6. CT06 - Auth Guard Completo: Bloquear acesso direto sem login ao Carrinho (/cart.html) e ao Checkout (/checkout-step-one.html)

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Navegar diretamente para '/cart.html' e '/checkout-step-one.html' sem sessão autenticada.
    - expect: Exibir mensagens 'Epic sadface: You can only access ''/cart.html'' when you are logged in.' e 'Epic sadface: You can only access ''/checkout-step-one.html'' when you are logged in.'.

#### 1.7. CT07 - Rodapé (Footer): Validar links de redes sociais (X/Twitter, Facebook, LinkedIn) e aviso de Copyright

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Autenticar e inspecionar os elementos [data-test='social-twitter'], [data-test='social-facebook'], [data-test='social-linkedin'] e [data-test='footer-copy'].
    - expect: Os links sociais devem estar visíveis com hrefs oficiais da Sauce Labs e o texto de copyright deve conter 'Sauce Labs. All Rights Reserved.'.

#### 1.8. CT08 - Persona Especial: performance_glitch_user deve autenticar e carregar o catálogo resiliando à alta latência

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Autenticar com performance_glitch_user e validar carregamento completo da vitrine.
    - expect: Redirecionar para '/inventory.html' e listar os 6 produtos sem uso de waitForTimeout estático.

#### 1.9. CT09 - Persona Especial: problem_user deve exibir a anomalia conhecida de imagem 404 nos produtos do catálogo

**File:** `tests/advanced-scenarios.spec.ts`

**Steps:**
  1. Autenticar com problem_user e inspecionar a imagem [data-test='inventory-item-sauce-labs-backpack-img'].
    - expect: O atributo src da imagem do Sauce Labs Backpack deve conter 'sl-404'.
