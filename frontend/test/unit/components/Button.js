import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {Button} from '@blueprintjs/core';

test('render `button`', async t => {
	const component = await shallow(<Button/>);
	t.is(component.type(), 'button');
});

test('set `className` prop', async t => {
	const component = await shallow(<Button/>);
	t.true(component.prop('className').includes('bp3-button'));
});
