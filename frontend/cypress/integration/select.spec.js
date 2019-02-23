describe('Select', () => {
	before(() => {
		cy.visit('http://localhost:3000');
	});

	it('Has class bp3-select', () => {
		cy.get('div').should('have.class', 'bp3-select');
	});

	it('Has prop name', () => {
		cy.get('select').should('have.prop', 'name');
	});

	it('Has option with prop value', () => {
		cy.get('select').find('option').should('have.prop', 'value');
	});
});
