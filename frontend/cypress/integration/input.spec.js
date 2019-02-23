describe('Input', () => {
	before(() => {
		cy.visit('http://localhost:3000');
	});

	it('Has class bp3-input', () => {
		cy.get('input').should('have.class', 'bp3-input');
	});

	it('Has prop name', () => {
		cy.get('input').should('have.prop', 'name');
	});

	it('Has prop type', () => {
		cy.get('input').should('have.prop', 'type');
	});

	it('Has prop type', () => {
		cy.get('input').should('have.prop', 'placeholder');
	});

	it('Has prop required', () => {
		cy.get('input').should('have.prop', 'required');
	});
});
