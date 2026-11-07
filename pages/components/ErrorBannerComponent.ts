import { type Page, type Locator, expect } from '@playwright/test';

export class ErrorBannerComponent {
  readonly message: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.message = page.locator('[data-test="error"]');
    this.closeButton = page.locator('[data-test="error-button"]');
  }

  async expectMessage(expectedText: string): Promise<void> {
    await expect(this.message).toBeVisible();
    await expect(this.message).toHaveText(expectedText);
  }

  async dismiss(): Promise<void> {
    await this.closeButton.click();
    await expect(this.message).toBeHidden();
  }
}

