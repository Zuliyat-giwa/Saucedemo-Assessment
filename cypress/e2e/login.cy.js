// cypress/e2e/login.cy.js

// This is the START of your main test suite for Sauce Demo Login Functionality.
// All your related tests will live inside these curly braces { ... }.
describe('Sauce Demo Login Functionality', () => {

  // This 'beforeEach' block runs before every single 'it' test within this 'describe' block.
  // It ensures we start at the login page for each test.
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  // TEST CASE 1: Successful login for standard user
  it('should allow a standard user to log in successfully', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Assertions to verify successful login and redirection
    cy.url().should('include', '/inventory.html') // Verify URL contains '/inventory.html'
    cy.get('.title').should('have.text', 'Products') // Verify 'Products' title is visible
  })

  // TEST CASE 2: Error message for invalid login credentials
  it('should display an error for invalid credentials', () => {
    cy.get('[data-test="username"]').type('invalid_user')
    cy.get('[data-test="password"]').type('wrong_password')
    cy.get('[data-test="login-button"]').click()

    // Assertion to verify the error message is displayed
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username and password do not match any user in this service');
  })

  // NEW TEST CASE 3: Add and remove products from the cart
  it('should allow adding and removing products from the cart', () => {
    // 1. Log in as a standard user to get to the products page
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html'); // Ensure we are on the products page

    // 2. Add the first product (Sauce Labs Backpack)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1'); // Verify cart count updates to 1

    // 3. Add a second product (Sauce Labs Bike Light)
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '2'); // Verify cart count updates to 2

    // 4. Navigate to the cart page to verify items are there
    cy.get('.shopping_cart_link').click(); // Click on the cart icon
    cy.url().should('include', '/cart.html'); // Verify we are on the cart page
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible'); // Verify item 1 is visible
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('be.visible'); // Verify item 2 is visible

    // 5. Remove one product from the cart page (Sauce Labs Bike Light)
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1'); // Verify cart count reduces to 1
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('not.exist'); // Verify item is no longer visible

    // 6. Go back to the products page
    cy.get('[data-test="continue-shopping"]').click();
    cy.url().should('include', '/inventory.html'); // Ensure we are back on products page

    // 7. Remove the last product (Sauce Labs Backpack) from the products page
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('not.exist'); // Verify cart badge disappears (cart is empty)
  })

}) // This is the END of your main 'describe' block.