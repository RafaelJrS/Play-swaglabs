export const USERS = {
  standard: {
    username: process.env.SWAG_USERNAME || 'standard_user',
    password: process.env.SWAG_PASSWORD || 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: process.env.SWAG_PASSWORD || 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: process.env.SWAG_PASSWORD || 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: process.env.SWAG_PASSWORD || 'secret_sauce',
  },
  invalid: {
    username: 'usuario_inexistente',
    password: 'senha_incorreta_123',
  },
};

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
