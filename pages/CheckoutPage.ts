import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
  }

  async expectStepOneLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
  }

  async fillCustomerInfoAndContinue(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async expectCheckoutError(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }

  async dismissCheckoutError(): Promise<void> {
    await this.errorCloseButton.click();
    await expect(this.errorMessage).toBeHidden();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
    await expect(this.page).toHaveURL(/.*cart\.html/);
  }

  async expectOverviewLoaded(expectedSubtotal: string, expectedTax: string, expectedTotal: string): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
    await expect(this.paymentInfoValue).toHaveText('SauceCard #31337');
    await expect(this.shippingInfoValue).toHaveText('Free Pony Express Delivery!');
    await expect(this.subtotalLabel).toContainText(expectedSubtotal);
    await expect(this.taxLabel).toContainText(expectedTax);
    await expect(this.totalLabel).toContainText(expectedTotal);
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }

  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }
}
