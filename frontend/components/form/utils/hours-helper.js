import React from 'react';
import * as wasm from '@pizzaql/hours-helper';

import config from '../../../config';

const hoursSelect = () => {
	const {hoursLock, openingTime, closingTime} = config.restaurant;

	const hours = wasm.get_hours();
	const minutes = wasm.get_minutes();

	if (hoursLock && hours === (closingTime - 4)) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{wasm.get_time(3, false)}</option>
				<option>{wasm.get_time(3, true)}</option>
				<option>{wasm.get_time(4, false)}</option>
				<option>{wasm.get_time(4, true)}</option>
				<option>{wasm.get_time(5, false)}</option>
			</>
		);
	}

	if (hoursLock && hours === (closingTime - 4)) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{wasm.get_time(3, false)}</option>
				<option>{wasm.get_time(3, true)}</option>
				<option>{wasm.get_time(4, false)}</option>
			</>
		);
	}

	if (hoursLock && hours === (closingTime - 3)) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{wasm.get_time(3, false)}</option>
			</>
		);
	}

	if (hoursLock && ((hours === (closingTime - 1) && minutes < 15) || hours === (closingTime - 2))) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
			</>
		);
	}

	if (hoursLock && ((hours === (closingTime - 1) && minutes > 15) || hours >= closingTime || hours < openingTime)) {
		return <option disabled value="">Restaurant is closed</option>;
	}

	return (
		<>
			<option value="">Select</option>
			<option value="ASAP">As fast as possible</option>
			<option>{wasm.get_time(3, false)}</option>
			<option>{wasm.get_time(3, true)}</option>
			<option>{wasm.get_time(4, false)}</option>
			<option>{wasm.get_time(4, true)}</option>
			<option>{wasm.get_time(5, false)}</option>
			<option>{wasm.get_time(5, true)}</option>
		</>
	);
};

export default hoursSelect;
