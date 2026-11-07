import { type Page, type Locator, expect } from '@playwright/test';
import { CHECKOUT_TEXTS, PAGE_TITLES } from '../test-data/app-content';
import type { OrderSummary } from '../test-data/types';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async expectLoaded(summary: OrderSummary): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(this.pageTitle).toHaveText(PAGE_TITLES.checkoutOverview);
    await expect(this.paymentInfo).toHaveText(CHECKOUT_TEXTS.paymentInfo);
    await expect(this.shippingInfo).toHaveText(CHECKOUT_TEXTS.shippingInfo);
    await expect(this.subtotalLabel).toHaveText(summary.subtotal);
    await expect(this.taxLabel).toHaveText(summary.tax);
    await expect(this.totalLabel).toHaveText(summary.total);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }
}

