import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;
  readonly menuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async gotoProtectedRoute(route: string): Promise<void> {
    await this.page.goto(route);
  }

  async expectLoginPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*saucedemo\.com\/?$/);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.menuButton.click();
    await expect(this.resetAppStateLink).toBeVisible();
    await this.resetAppStateLink.click();
    await this.closeMenuButton.click();
  }

  async expectAboutLinkAndNavigateToAllItems(): Promise<void> {
    await this.menuButton.click();
    await expect(this.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/');
    await this.allItemsLink.click();
  }

  async expectInventoryLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
  }

  async expectErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }

  async dismissErrorMessage(): Promise<void> {
    await this.errorCloseButton.click();
    await expect(this.errorMessage).toBeHidden();
  }
}
