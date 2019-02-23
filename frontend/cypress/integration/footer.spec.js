describe('Footer', () => {
	before(() => {
		cy.visit('http://localhost:3000');
	});

	it('Footer text', () => {
		cy.get('footer').find('p').should('have.text', 'Powered by PizzaQL 🍕');
	});

	it('Footer theme switch label class', () => {
		cy.get('label').should('have.class', 'bp3-control bp3-switch');
	});

	it('Footer theme switch label text', () => {
		cy.get('footer').find('label').should('have.text', 'Dark Mode');
	});

	it('Footer theme switch input type', () => {
		cy.get('footer').find('label').find('input').should('have.prop', 'type');
	});
});
