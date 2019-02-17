describe('Submit button', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Has class bp3-button', () => {
		cy.get('button').should('have.class', 'bp3-button');
	});

	it('Has valid text', () => {
		cy.get('button').find('span').should('have.text', 'Submit!');
	});

	it('Has prop type', () => {
		cy.get('button').should('have.prop', 'type');
	});

	it('Has span with class bp3-button-text', () => {
		cy.get('button').find('span').should('have.class', 'bp3-button-text');
	});
});
