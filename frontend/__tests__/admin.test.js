import {shallow} from 'enzyme';
import React from 'react';

import Admin from '../pages/admin';

describe('Order Management', () => {
	it('Not logged in', () => {
		const admin = shallow(<Admin/>);

		expect(admin.find('p').text()).toEqual('You\'re not logged in yet, click here to login.');
	});
});
