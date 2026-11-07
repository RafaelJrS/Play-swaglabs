import { type Page, type Locator, expect } from '@playwright/test';
import { CHECKOUT_TEXTS, PAGE_TITLES } from '../test-data/app-content';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
    await expect(this.pageTitle).toHaveText(PAGE_TITLES.checkoutComplete);
    await expect(this.completeHeader).toHaveText(CHECKOUT_TEXTS.completeHeader);
    await expect(this.completeText).toHaveText(CHECKOUT_TEXTS.completeText);
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }
}

