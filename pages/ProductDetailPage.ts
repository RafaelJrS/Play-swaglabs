import { type Page, type Locator, expect } from '@playwright/test';
import type { Product } from '../test-data/types';

export class ProductDetailPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async expectLoaded(product: Product): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory-item\.html/);
    await expect(this.backToProductsButton).toBeVisible();
    await expect(this.itemName).toHaveText(product.name);
    await expect(this.itemPrice).toHaveText(product.price);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.removeButton).toBeVisible();
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }
}

