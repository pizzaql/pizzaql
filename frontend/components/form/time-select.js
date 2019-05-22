import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import {format, addHours} from 'date-fns';
import PropTypes from 'prop-types';

const getTime = (number, isHalfPast) => {
	const formatted = addHours(new Date(), number);
	const date = format(formatted, 'HH');

	return isHalfPast ? `${date}:30` : `${date}:00`;
};

const Wrapper = ({className}) => (
	<Label className={className}>
    Delivery time:
		<div className="bp3-select">
			<FastField name="time" component="select" placeholder="Time" required>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{getTime(3)}</option>
				<option>{getTime(3, true)}</option>
				<option>{getTime(4)}</option>
				<option>{getTime(4, true)}</option>
				<option>{getTime(5)}</option>
				<option>{getTime(5, true)}</option>
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
