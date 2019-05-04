describe('Footer', () => {
	before(() => {
		cy.visit('http://localhost:3000');
	});

	it('Footer text', () => {
		cy.get('footer').find('p').should('have.text', 'Powered by PizzaQL 🍕');
	});
});
