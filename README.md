describe('Add to Cart Tests', () = {
  beforeEach(() = {
    cy.visit('httpswww.saucedemo.com');
    cy.get('[data-test=username]').type('standard_user');
    cy.get('[data-test=password]').type('secret_sauce');
    cy.get('[data-test=login-button]').click();
  });

  it('should add a product to the cart', () = {
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
    cy.get('.shopping_cart_badge').should('contain', '1');
  });
});
