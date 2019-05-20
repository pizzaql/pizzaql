import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className}) => (
	<Label className={className}>
    Dough:
		<div className="bp3-select">
			<FastField name="dough" component="select" placeholder="Dough" required>
				<option value="">Select</option>
				<option value="Thin">Thin</option>
				<option value="Thick">Thick</option>
			</FastField>
		</div>
	</Label>
);

const DoughSelect = styled(Wrapper)`
    width: 200px;
`;

DoughSelect.propTypes = {
	className: PropTypes.string
};

export default DoughSelect;
