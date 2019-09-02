import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

import config from '../../config';

const {pizzas} = config;

const types = Object.keys(pizzas);

const Wrapper = ({className}) => (
	<Label className={className}>
Pizza Type:
		<div className="bp3-select">
			<FastField name="type" component="select" placeholder="Pizza Type" required>
				<option value="">Select</option>
				{types.map(type => <option value={type} key={type}>{type}</option>)}
			</FastField>
		</div>
	</Label>
);

const TypeSelect = styled(Wrapper)`
    width: 11rem;
	user-select: none;
`;

TypeSelect.propTypes = {
	className: PropTypes.string
};

export default TypeSelect;
