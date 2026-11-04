import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type SwagLabsFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<SwagLabsFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';

