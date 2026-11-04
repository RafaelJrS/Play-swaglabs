import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectCartLoaded(expectedItemCount: number): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await expect(this.pageTitle).toHaveText('Your Cart');
    await expect(this.cartItems).toHaveCount(expectedItemCount);
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.itemNames.filter({ hasText: productName })).toBeVisible();
  }

  async removeProductBySlug(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

