import React from 'react';
import {format, addHours} from 'date-fns';
import mem from 'mem';

// Add specific amount of hours to the current date and format it
const getTime = (number, isHalfPast) => {
	const formatted = addHours(new Date(), number);
	const date = format(formatted, 'HH');

	return isHalfPast ? `${date}:30` : `${date}:00`;
};

const memGetTime = mem(getTime);

// Hours lock: Show available delivery time based on the current hour
const hoursSelect = () => {
	// Change to true to enable
	const hoursLock = false;

	const hours = new Date().getHours();
	const minutes = new Date().getMinutes();

	if (hoursLock && hours === 14) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{memGetTime(3)}</option>
				<option>{memGetTime(3, true)}</option>
				<option>{memGetTime(4)}</option>
				<option>{memGetTime(4, true)}</option>
				<option>{memGetTime(5)}</option>
			</>
		);
	}

	if (hoursLock && hours === 15) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{memGetTime(3)}</option>
				<option>{memGetTime(3, true)}</option>
				<option>{memGetTime(4)}</option>
			</>
		);
	}

	if (hoursLock && hours === 16) {
		return (
			<>
				<option value="">Select</option>
				<option value="ASAP">As fast as possible</option>
				<option>{memGetTime(3)}</option>
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
			<option>{memGetTime(3)}</option>
			<option>{memGetTime(3, true)}</option>
			<option>{memGetTime(4)}</option>
			<option>{memGetTime(4, true)}</option>
			<option>{memGetTime(5)}</option>
			<option>{memGetTime(5, true)}</option>
		</>
	);
};

export default hoursSelect;
