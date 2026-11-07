import type { SocialLinks } from './types';

export const PAGE_TITLES = {
  inventory: 'Products',
  cart: 'Your Cart',
  checkoutInformation: 'Checkout: Your Information',
  checkoutOverview: 'Checkout: Overview',
  checkoutComplete: 'Checkout: Complete!',
};

export const CHECKOUT_TEXTS = {
  paymentInfo: 'SauceCard #31337',
  shippingInfo: 'Free Pony Express Delivery!',
  completeHeader: 'Thank you for your order!',
  completeText: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
};

export const EXTERNAL_LINKS: SocialLinks & { about: string } = {
  about: 'https://saucelabs.com/',
  twitter: 'https://x.com/saucelabs',
  facebook: 'https://www.facebook.com/saucelabs',
  linkedin: 'https://www.linkedin.com/company/sauce-labs/',
};

export const FOOTER_COPYRIGHT = 'Sauce Labs. All Rights Reserved.';

export const ERROR_MESSAGES = {
  login: {
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    unauthorizedInventory: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    unauthorizedCart: "Epic sadface: You can only access '/cart.html' when you are logged in.",
    unauthorizedCheckout: "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.",
  },
  checkout: {
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
  },
};

