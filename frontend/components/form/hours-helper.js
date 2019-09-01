import React from 'react';
import * as wasm from '@pizzaql/hours-helper';

import config from '../../config';

const {hoursLock} = config;

const hoursSelect = () => {
	// Hours lock: Show available delivery time based on the current hour
	// Change to true to enable

	const hours = new Date().getHours();
	const minutes = new Date().getMinutes();

	if (hoursLock && hours === 14) {
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

	if (hoursLock && hours === 15) {
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

	if (hoursLock && hours === 16) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{wasm.get_time(3, false)}</option>
			</>
		);
	}

	if (hoursLock && ((hours === 18 && minutes < 15) || hours === 17)) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
			</>
		);
	}

	if (hoursLock && ((hours === 18 && minutes > 15) || hours <= 19 || hours <= 10)) {
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
