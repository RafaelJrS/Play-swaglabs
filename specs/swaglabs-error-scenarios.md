# Swag Labs — Plano de Testes de Validações de Erro, Restrições de Acesso e Carrinho Vazio

## Application Overview

Plano de testes cobrindo todos os cenários negativos, mensagens de erro em tela ([data-test='error']), bloqueio de rotas não autenticadas, fechamento de alertas de erro ([data-test='error-button']), carrinho sem produtos e validações de campos obrigatórios no Checkout Step One (First Name, Last Name e Postal Code).

## Test Scenarios

### 1. Swag Labs - Validações de Erro e Exceções (Negative & Edge Cases)

**Seed:** `tests/seed.spec.ts`

#### 1.1. CT01 - Erro ao tentar login sem preencher o campo Username

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Navegar para '/', deixar Username em branco, preencher Password e clicar em Login.
    - expect: Exibir alerta [data-test='error'] com o texto 'Epic sadface: Username is required'.

#### 1.2. CT02 - Erro ao tentar login sem preencher o campo Password

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Navegar para '/', preencher Username ('standard_user'), deixar Password em branco e clicar em Login.
    - expect: Exibir alerta [data-test='error'] com o texto 'Epic sadface: Password is required'.

#### 1.3. CT03 - Erro ao tentar login com senha incorreta ou usuário inexistente

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Navegar para '/', preencher Username ('standard_user') e Password incorreta ('senha_errada_123') e clicar em Login.
    - expect: Exibir alerta [data-test='error'] com o texto 'Epic sadface: Username and password do not match any user in this service'.

#### 1.4. CT04 - Erro de usuário bloqueado (locked_out_user) e fechamento do alerta de erro (X)

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Tentar login com locked_out_user e em seguida clicar no botão de fechar erro ([data-test='error-button']).
    - expect: Exibir alerta [data-test='error'] com 'Epic sadface: Sorry, this user has been locked out.' e ocultá-lo ao clicar em [data-test='error-button'].

#### 1.5. CT05 - Bloqueio de acesso direto ao catálogo (/inventory.html) sem autenticação

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Navegar diretamente para '/inventory.html' sem realizar login.
    - expect: Redirecionar para '/' e exibir alerta [data-test='error'] com 'Epic sadface: You can only access ''/inventory.html'' when you are logged in.'.

#### 1.6. CT06 - Validação de Carrinho Vazio (acesso sem produtos adicionados)

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Autenticar com standard_user e clicar diretamente no ícone do carrinho sem adicionar produtos.
    - expect: Exibir tela '/cart.html' com título 'Your Cart', lista de itens vazia (0 produtos) e badge do carrinho oculto.

#### 1.7. CT07 - Erro no Checkout Step One ao avançar sem preencher First Name (Nome obrigatório)

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Ir até o Checkout Step One, deixar First Name vazio, preencher Last Name e Postal Code e clicar em Continue.
    - expect: Permanecer em '/checkout-step-one.html' e exibir alerta [data-test='error'] com 'Error: First Name is required'.

#### 1.8. CT08 - Erro no Checkout Step One ao avançar sem preencher Last Name (Sobrenome obrigatório)

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Ir até o Checkout Step One, preencher First Name, deixar Last Name vazio, preencher Postal Code e clicar em Continue.
    - expect: Permanecer em '/checkout-step-one.html' e exibir alerta [data-test='error'] com 'Error: Last Name is required'.

#### 1.9. CT09 - Erro no Checkout Step One sem Postal Code (CEP/Documento obrigatório), fechar erro e cancelar checkout

**File:** `tests/error-scenarios.spec.ts`

**Steps:**
  1. Ir até o Checkout Step One, preencher First Name e Last Name, deixar Postal Code vazio, clicar em Continue, fechar o erro e clicar em Cancel.
    - expect: Exibir alerta [data-test='error'] com 'Error: Postal Code is required', ocultar o alerta ao clicar em [data-test='error-button'] e retornar para '/cart.html' ao clicar em Cancel ([data-test='cancel']).
