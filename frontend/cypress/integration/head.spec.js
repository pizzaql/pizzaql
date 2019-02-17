describe('Head', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Has a valid title', () => {
		cy.title().should('eq', 'PizzaQL');
	});

	it('Has a valid description', () => {
		cy.get('head meta[name="description"]')
			.should('have.attr', 'content', 'Modern Order Management & Placement System');
	});

	it('Has a valid theme-color', () => {
		cy.get('head meta[name="theme-color"]')
			.should('have.attr', 'content', '#212121');
	});

	it('Has a responsive viewport', () => {
		cy.get('head meta[name="viewport"]')
			.should('have.attr', 'content', 'width=device-width, initial-scale=1.0');
	});
});
