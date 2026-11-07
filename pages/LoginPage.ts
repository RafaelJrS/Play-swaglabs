import { type Page, type Locator, expect } from '@playwright/test';
import { ErrorBannerComponent } from './components/ErrorBannerComponent';
import type { UserCredentials } from '../test-data/types';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: ErrorBannerComponent;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorBanner = new ErrorBannerComponent(page);
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

  async loginAs(user: UserCredentials): Promise<void> {
    await this.goto();
    await this.login(user.username, user.password);
  }

  async expectErrorMessage(expectedText: string): Promise<void> {
    await this.errorBanner.expectMessage(expectedText);
  }

  async dismissErrorMessage(): Promise<void> {
    await this.errorBanner.dismiss();
  }
}
