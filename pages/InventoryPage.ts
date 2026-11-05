import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly backToProductsButton: Locator;
  readonly detailAddToCartButton: Locator;
  readonly detailRemoveButton: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerCopy: Locator;
  readonly backpackImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.detailAddToCartButton = page.locator('[data-test="add-to-cart"]');
    this.detailRemoveButton = page.locator('[data-test="remove"]');
    this.twitterLink = page.getByRole('link', { name: 'X' });
    this.facebookLink = page.getByRole('link', { name: 'Facebook' });
    this.linkedinLink = page.getByRole('link', { name: 'LinkedIn' });
    this.footerCopy = page.locator('[data-test="footer-copy"]');
    this.backpackImage = page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]');
  }

  async expectCatalogLoaded(expectedCount = 6): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async sortBy(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async expectFirstProduct(expectedName: string, expectedPrice: string): Promise<void> {
    await expect(this.itemNames.first()).toHaveText(expectedName);
    await expect(this.itemPrices.first()).toHaveText(expectedPrice);
  }

  async openProductDetails(productName: string): Promise<void> {
    await this.itemNames.filter({ hasText: productName }).click();
    await expect(this.page).toHaveURL(/.*inventory-item\.html/);
    await expect(this.backToProductsButton).toBeVisible();
  }

  async expectProductDetailLoaded(expectedName: string, expectedPrice: string): Promise<void> {
    await expect(this.itemNames).toHaveText(expectedName);
    await expect(this.itemPrices).toHaveText(expectedPrice);
  }

  async addFromDetailsAndVerify(): Promise<void> {
    await this.detailAddToCartButton.click();
    await expect(this.detailRemoveButton).toBeVisible();
  }

  async backToCatalog(): Promise<void> {
    await this.backToProductsButton.click();
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addProductBySlug(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
    await expect(this.page.locator(`[data-test="remove-${productSlug}"]`)).toBeVisible();
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async reloadCatalog(): Promise<void> {
    await this.page.reload();
  }

  async expectFooterLinksAndCopyright(): Promise<void> {
    await expect(this.twitterLink).toHaveAttribute('href', 'https://x.com/saucelabs');
    await expect(this.facebookLink).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
    await expect(this.linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
    await expect(this.footerCopy).toContainText('Sauce Labs. All Rights Reserved.');
  }

  async expectBackpackImageSrcContains(expectedSubstring: string): Promise<void> {
    await expect(this.backpackImage).toHaveAttribute('src', new RegExp(expectedSubstring));
  }
}
