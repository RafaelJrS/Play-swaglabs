# Swag Labs — Plano de Testes Funcionais E2E (Caminho Feliz)

## Application Overview

Plano de testes End-to-End (Caminho Feliz) cobrindo amplamente a navegação, catálogo de produtos, ordenação, detalhes do produto, carrinho de compras, checkout completo (Step One, Step Two e Confirmação) e logout no Swag Labs, validando títulos, badges, mensagens e URLs em cada tela.

## Test Scenarios

### 1. Swag Labs - Jornadas de Sucesso (Happy Path)

**Seed:** `tests/seed.spec.ts`

#### 1.1. CT01 - Autenticação e Logout pelo Menu Lateral

**File:** `tests/happy-path.spec.ts`

**Steps:**
  1. Navegar para a página inicial (/) do Swag Labs.
    - expect: A tela de login deve exibir o logo 'Swag Labs' e os campos Username, Password e botão Login.
  2. Preencher credenciais do standard_user e clicar em Login.
    - expect: Redirecionar para '/inventory.html' e exibir o título 'Products' ([data-test='title']).
  3. Clicar no botão 'Open Menu' (#react-burger-menu-btn) e acionar 'Logout'.
    - expect: O menu lateral deve abrir exibindo o link 'Logout' ([data-test='logout-sidebar-link']).
  4. Verificar retorno para a tela de autenticação.
    - expect: Retornar para a URL raiz '/' com o botão Login ([data-test='login-button']) visível.

#### 1.2. CT02 - Navegação no Catálogo e Ordenação de Produtos (A-Z, Z-A, Menor e Maior Preço)

**File:** `tests/happy-path.spec.ts`

**Steps:**
  1. Autenticar com standard_user.
    - expect: Estar na tela '/inventory.html' com título 'Products' e 6 itens listados.
  2. Selecionar a ordenação 'Name (Z to A)' ('za') no seletor [data-test='product-sort-container'].
    - expect: O primeiro item deve ser 'Test.allTheThings() T-Shirt (Red)'.
  3. Selecionar a ordenação 'Price (low to high)' ('lohi').
    - expect: O primeiro item deve ser 'Sauce Labs Onesie' com preço '$7.99'.
  4. Selecionar a ordenação 'Price (high to low)' ('hilo').
    - expect: O primeiro item deve ser 'Sauce Labs Fleece Jacket' com preço '$49.99'.

#### 1.3. CT03 - Inspeção de Detalhes do Produto, Adição ao Carrinho e Retorno ao Catálogo

**File:** `tests/happy-path.spec.ts`

**Steps:**
  1. Autenticar e clicar no título do produto 'Sauce Labs Backpack'.
    - expect: Redirecionar para '/inventory-item.html' exibindo o botão 'Back to products' ([data-test='back-to-products']), nome 'Sauce Labs Backpack' e preço '$29.99'.
  2. Clicar em 'Add to cart' ([data-test='add-to-cart']) na tela de detalhes.
    - expect: O botão deve mudar para 'Remove' ([data-test='remove']) e o badge do carrinho ([data-test='shopping-cart-badge']) deve exibir '1'.
  3. Clicar em 'Back to products' ([data-test='back-to-products']).
    - expect: Retornar para '/inventory.html' com o título 'Products' e manter o badge do carrinho com valor '1'.

#### 1.4. CT04 - Gestão do Carrinho (Adicionar Múltiplos Itens, Remover Item e Continuar Comprando)

**File:** `tests/happy-path.spec.ts`

**Steps:**
  1. Autenticar e adicionar 'Sauce Labs Backpack' e 'Sauce Labs Bike Light' ao carrinho pelo catálogo.
    - expect: O badge do carrinho ([data-test='shopping-cart-badge']) deve exibir '2'.
  2. Clicar no ícone do carrinho ([data-test='shopping-cart-link']).
    - expect: Redirecionar para '/cart.html', exibir o título 'Your Cart' ([data-test='title']) e listar os 2 produtos adicionados.
  3. Remover 'Sauce Labs Bike Light' clicando em seu botão 'Remove' ([data-test='remove-sauce-labs-bike-light']).
    - expect: O badge do carrinho deve atualizar para '1' e restar apenas 'Sauce Labs Backpack' na lista.
  4. Clicar em 'Continue Shopping' ([data-test='continue-shopping']).
    - expect: Retornar para '/inventory.html' com o título 'Products'.

#### 1.5. CT05 - Fluxo E2E Completo de Compra (Login -> Catálogo -> Carrinho -> Checkout Step 1 -> Step 2 -> Pedido Concluído -> Back Home)

**File:** `tests/happy-path.spec.ts`

**Steps:**
  1. Autenticar com standard_user e adicionar 'Sauce Labs Backpack' ($29.99) e 'Sauce Labs Bike Light' ($9.99).
    - expect: Estar em '/inventory.html' com título 'Products' e badge do carrinho exibindo '2'.
  2. Acessar o carrinho ([data-test='shopping-cart-link']).
    - expect: Estar em '/cart.html' com título 'Your Cart' e os 2 produtos listados.
  3. Clicar no botão 'Checkout' ([data-test='checkout']).
    - expect: Redirecionar para '/checkout-step-one.html' com o título 'Checkout: Your Information'.
  4. Preencher First Name, Last Name e Postal Code e clicar em 'Continue' ([data-test='continue']).
    - expect: Redirecionar para '/checkout-step-two.html' com o título 'Checkout: Overview', exibindo Payment Information ('SauceCard #31337'), Shipping Information ('Free Pony Express Delivery!'), Subtotal ('Item total: $39.98'), Tax ('Tax: $3.20') e Total ('Total: $43.18').
  5. Clicar no botão 'Finish' ([data-test='finish']).
    - expect: Redirecionar para '/checkout-complete.html' com o título 'Checkout: Complete!', header 'Thank you for your order!' ([data-test='complete-header']) e texto 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' ([data-test='complete-text']).
  6. Clicar no botão 'Back Home' ([data-test='back-to-products']).
    - expect: Retornar para '/inventory.html' com o título 'Products' e o carrinho vazio (sem badge).
