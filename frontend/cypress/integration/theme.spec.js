describe('Theme Switch', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Dark mode', () => {
		cy.clearLocalStorage();
		cy.get('#__next > div > footer > label > input[type="checkbox"]').click({force: true}).should(() => {
			expect(localStorage.getItem('bodyTheme')).to.eq('bp3-dark');
			expect(localStorage.getItem('theme')).to.eq('dark');
		});
	});

	it('Light mode', () => {
		cy.clearLocalStorage('prop1').should(ls => {
			expect(ls.getItem('bodyTheme')).to.eq(null);
			expect(ls.getItem('theme')).to.eq(null);
		});
	});
});
