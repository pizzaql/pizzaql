describe('Checkbox', () => {
	before(() => {
		cy.visit('http://localhost:3000');
	});

	it('Has type checkbox', () => {
		cy.get('#__next > div > div > form > label.bp3-control.bp3-checkbox > input[type=checkbox]').should('have.prop', 'type', 'checkbox');
    });

	it('Has class bp3-checkbox', () => {
		cy.get('label').should('have.class', 'bp3-checkbox');
	});
});
