import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

import hoursSelect from './hours-helper';

const Wrapper = ({className}) => (
	<Label className={className}>
    Delivery time:
		<div className="bp3-select">
			<FastField name="time" component="select" placeholder="Time" required>
				{hoursSelect()}
			</FastField>
		</div>
	</Label>
);

const TimeSelect = styled(Wrapper)`
    width: 11rem;
	user-select: none;
`;

TimeSelect.propTypes = {
	className: PropTypes.string
};

export default TimeSelect;
