import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import Admin from '../../../pages/admin';

test('Is not logged in', async t => {
	const page = await shallow(<Admin/>);
	t.true(page.text('p').includes('You\'re not logged in yet, click here to login.'));
});
