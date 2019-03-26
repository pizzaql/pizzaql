import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const now = new Date();

const firstHour = (now.getHours() + 1) + ':' + now.getMinutes();
const secondHour = (now.getHours() + 2) + ':' + now.getMinutes();

const Wrapper = ({className}) => (
	<Label className={className}>
    Delivery time:
		<div className="bp3-select">
			<FastField name="time" component="select" placeholder="Time">
				<option>Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{firstHour}</option>
				<option>{secondHour}</option>
			</FastField>
		</div>
	</Label>
);

const TimeSelect = styled(Wrapper)`
    width: 200px;
`;

TimeSelect.propTypes = {
	className: PropTypes.string
};

export default TimeSelect;
