import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import dayjs from 'dayjs';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className}) => (
	<Label className={className}>
    Delivery time:
		<div className="bp3-select">
			<FastField name="time" component="select" placeholder="Time">
				<option>Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{dayjs().startOf('minutes').add(2, 'hour').format('HH:mm')}</option>
				<option>{dayjs().startOf('minutes').add(3, 'hour').format('HH:mm')}</option>
			</FastField>
		</div>
	</Label>
);

const TimeSelect = styled(Wrapper)`
    width: 200px;
`;

TimeSelect.propTypes = {
	className: PropTypes.string.isRequired
};

export default TimeSelect;
