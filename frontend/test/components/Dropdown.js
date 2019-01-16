import 'jsdom-global/register';
import test from 'ava';
import React from 'react';
import {mount} from 'enzyme';
import Home from '../../pages/home';

test('value', async t => {
	const component = await mount(<Home/>);
	t.true(
		component.find('select').filterWhere(item => {
			return item.prop('name') === 'type';
		}).prop('value').includes('')
	);
});

test('placeholder', async t => {
	const component = await mount(<Home/>);
	t.true(
		component.find('select').filterWhere(item => {
			return item.prop('name') === 'type';
		}).prop('placeholder').includes('Pizza Type')
	);
});
