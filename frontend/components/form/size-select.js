import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className}) => (
	<Label className={className}>
    Size:
		<div className="bp3-select">
			<FastField name="size" component="select" placeholder="Size" required>
				<option value="">Select</option>
				<option value="Small">Small</option>
				<option value="Medium">Medium</option>
				<option value="Large">Large</option>
				<option value="Extra Large">Extra Large</option>
			</FastField>
		</div>
	</Label>
);

const SizeSelect = styled(Wrapper)`
    width: 200px;
`;

SizeSelect.propTypes = {
	className: PropTypes.string
};

export default SizeSelect;
