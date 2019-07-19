describe('Radio', () => {
	before(() => {
		cy.visit('http://localhost:3000');
	});

	it('Has type radio', () => {
		cy.get('#__next > div > div > form > div:nth-child(12) > label:nth-child(2) > input[type=radio]').should('have.prop', 'type', 'radio');
    });

    it('Is checked', () => {
		cy.get('#__next > div > div > form > div:nth-child(12) > label:nth-child(2) > input[type=radio]').should('have.prop', 'checked');
    });

	it('Has class bp3-radio', () => {
		cy.get('label').should('have.class', 'bp3-radio');
	});
});
