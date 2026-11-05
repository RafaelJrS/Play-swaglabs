export const PRODUCTS = {
  backpack: {
    name: 'Sauce Labs Backpack',
    slug: 'sauce-labs-backpack',
    price: '$29.99',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    slug: 'sauce-labs-bike-light',
    price: '$9.99',
  },
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    slug: 'sauce-labs-bolt-t-shirt',
    price: '$15.99',
  },
  onesie: {
    name: 'Sauce Labs Onesie',
    slug: 'sauce-labs-onesie',
    price: '$7.99',
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    slug: 'sauce-labs-fleece-jacket',
    price: '$49.99',
  },
  redTShirt: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    slug: 'test.allthethings()-t-shirt-(red)',
    price: '$15.99',
  },
};

export const ALL_PRODUCT_SLUGS = [
  PRODUCTS.backpack.slug,
  PRODUCTS.bikeLight.slug,
  PRODUCTS.boltTShirt.slug,
  PRODUCTS.fleeceJacket.slug,
  PRODUCTS.onesie.slug,
  PRODUCTS.redTShirt.slug,
];

export const CUSTOMER = {
  firstName: process.env.SWAG_FIRST_NAME || 'Rafael',
  lastName: process.env.SWAG_LAST_NAME || 'Silva',
  postalCode: process.env.SWAG_POSTAL_CODE || '01001-000',
};
