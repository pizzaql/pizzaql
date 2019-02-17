import React from 'react';
import styled from 'styled-components';
import {FastField, ErrorMessage} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className}) => (
	<Label className={className}>
    Size:
		<div className="bp3-select">
			<FastField name="size" component="select" placeholder="Size">
				<option>Select</option>
				<option value="Small">Small</option>
				<option value="Medium">Medium</option>
				<option value="Large">Large</option>
				<option value="Extra Large">Extra Large</option>
			</FastField>
			<ErrorMessage name="size" component="div"/>
		</div>
	</Label>
);

const SizeSelect = styled(Wrapper)`
    width: 200px;
`;

SizeSelect.propTypes = {
	className: PropTypes.string.isRequired
};

export default SizeSelect;
