import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';
import {Label} from '@blueprintjs/core';

test('render `label`', async t => {
	const component = await shallow(<Label/>);
	t.is(component.type(), 'label');
});

test('set `className` prop', async t => {
	const component = await shallow(<Label/>);
	t.true(component.prop('className').includes('bp3-label'));
});
