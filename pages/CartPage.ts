import { type Page, type Locator, expect } from '@playwright/test';
import { PAGE_TITLES } from '../test-data/app-content';
import type { Product } from '../test-data/types';

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
    await expect(this.pageTitle).toHaveText(PAGE_TITLES.cart);
    await expect(this.cartItems).toHaveCount(expectedItemCount);
  }

  async expectProductInCart(product: Product): Promise<void> {
    await expect(this.itemNames.filter({ hasText: product.name })).toBeVisible();
  }

  async removeProduct(product: Product): Promise<void> {
    await this.page.locator(`[data-test="remove-${product.slug}"]`).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
