import {shallow} from 'enzyme';
import React from 'react';

import Home from '../pages/home';

describe('Order Placement', () => {
	it('Dropdowns', () => {
		const home = shallow(<div className="bp3-select small-width"/>);

		expect(home.is('.bp3-select')).toEqual(true);
	});

	it('Inline', () => {
		const home = shallow(<div className="inline"/>);

		expect(home.is('.inline')).toEqual(true);
	});

	it('Footer', () => {
		const home = shallow(<Home/>);

		expect(home.find('p').text()).toEqual('Powered by PizzaQL 🍕');
	});
});
