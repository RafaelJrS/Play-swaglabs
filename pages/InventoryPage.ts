import { type Page, type Locator, expect } from '@playwright/test';
import { PAGE_TITLES } from '../test-data/app-content';
import type { Product } from '../test-data/types';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async expectCatalogLoaded(expectedCount = 6): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.pageTitle).toHaveText(PAGE_TITLES.inventory);
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async expectFirstProduct(product: Product): Promise<void> {
    await expect(this.itemNames.first()).toHaveText(product.name);
    await expect(this.itemPrices.first()).toHaveText(product.price);
  }

  async openProductDetails(product: Product): Promise<void> {
    await this.itemNames.filter({ hasText: product.name }).click();
  }

  async addProductToCart(product: Product): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${product.slug}"]`).click();
    await expect(this.page.locator(`[data-test="remove-${product.slug}"]`)).toBeVisible();
  }

  async addProductsToCart(products: Product[]): Promise<void> {
    for (const product of products) {
      await this.addProductToCart(product);
    }
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async expectProductImageSrcContains(product: Product, expectedSubstring: string): Promise<void> {
    const image = this.page.locator(`[data-test="inventory-item-${product.slug}-img"]`);
    await expect(image).toHaveAttribute('src', new RegExp(expectedSubstring));
  }
}
