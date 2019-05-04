describe('Thank you page', () => {
	before(() => {
		cy.visit('http://localhost:3000/order?id="123123123"');
	});

	it('Has header with class thanks', () => {
		cy.get('h1').should('have.class', 'thanks');
	});

	it('Has button with class bp3-button', () => {
		cy.get('button').should('have.class', 'bp3-button');
	});

	it('Has input with class bp3-input', () => {
		cy.get('input').should('have.class', 'bp3-input');
	});

	it('Has input with prop readonly', () => {
		cy.get('input').should('have.prop', 'readonly');
	});

	it('Has input with valid value', () => {
		cy.get('input').should('have.value', '123123123');
	});
});
