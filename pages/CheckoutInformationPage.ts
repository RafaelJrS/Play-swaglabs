import { type Page, type Locator, expect } from '@playwright/test';
import { ErrorBannerComponent } from './components/ErrorBannerComponent';
import { PAGE_TITLES } from '../test-data/app-content';
import type { Customer } from '../test-data/types';

export class CheckoutInformationPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorBanner: ErrorBannerComponent;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorBanner = new ErrorBannerComponent(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(this.pageTitle).toHaveText(PAGE_TITLES.checkoutInformation);
  }

  async submitCustomerInfo(customer: Customer): Promise<void> {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
    await this.continueButton.click();
  }

  async expectErrorMessage(expectedText: string): Promise<void> {
    await this.errorBanner.expectMessage(expectedText);
  }

  async dismissErrorMessage(): Promise<void> {
    await this.errorBanner.dismiss();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await expect(this.page).toHaveURL(/.*cart\.html/);
  }
}

