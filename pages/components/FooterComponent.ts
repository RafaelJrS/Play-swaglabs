import { type Page, type Locator, expect } from '@playwright/test';
import type { SocialLinks } from '../../test-data/types';

export class FooterComponent {
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    const footer = page.getByRole('contentinfo');
    this.twitterLink = footer.getByRole('link', { name: 'X', exact: true });
    this.facebookLink = footer.getByRole('link', { name: 'Facebook', exact: true });
    this.linkedinLink = footer.getByRole('link', { name: 'LinkedIn', exact: true });
    this.copyright = page.locator('[data-test="footer-copy"]');
  }

  async expectSocialLinks(links: SocialLinks): Promise<void> {
    await expect(this.twitterLink).toHaveAttribute('href', links.twitter);
    await expect(this.facebookLink).toHaveAttribute('href', links.facebook);
    await expect(this.linkedinLink).toHaveAttribute('href', links.linkedin);
  }

  async expectCopyright(expectedText: string): Promise<void> {
    await expect(this.copyright).toContainText(expectedText);
  }
}

