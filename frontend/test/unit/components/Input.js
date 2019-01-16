import 'jsdom-global/register';
import test from 'ava';
import React from 'react';
import {mount} from 'enzyme';
import Home from '../../../pages/home';

test('value', async t => {
	const component = await mount(<Home/>);
	t.true(
		component.find('input').filterWhere(item => {
			return item.prop('name') === 'name';
		}).prop('value').includes('')
	);
});

test('className', async t => {
	const component = await mount(<Home/>);
	t.true(
		component.find('input').filterWhere(item => {
			return item.prop('name') === 'name';
		}).prop('className').includes('bp3-input')
	);
});

test('type', async t => {
	const component = await mount(<Home/>);
	t.true(
		component.find('input').filterWhere(item => {
			return item.prop('name') === 'name';
		}).prop('type').includes('text')
	);
});

test('placeholder', async t => {
	const component = await mount(<Home/>);
	t.true(
		component.find('input').filterWhere(item => {
			return item.prop('name') === 'name';
		}).prop('placeholder').includes('Mark Suckerberg')
	);
});
