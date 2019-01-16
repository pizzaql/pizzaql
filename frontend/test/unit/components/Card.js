import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {Card} from '@blueprintjs/core';

test('render `div`', async t => {
	const component = await shallow(<Card/>);
	t.is(component.type(), 'div');
});

test('set `className` prop', async t => {
	const component = await shallow(<Card/>);
	t.true(component.prop('className').includes('bp3-card'));
});
