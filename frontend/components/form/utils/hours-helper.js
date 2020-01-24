'use strict';

import config from '../../../config';

export const deliveryHours = async () => {
	const {hoursLock, openingTime, closingTime} = config.restaurant;

	const wasm = await import('@pizzaql/hours-helper');

	const hours = wasm.get_hours();
	const minutes = wasm.get_minutes();

	if (hoursLock && hours === (closingTime - 4)) {
		return [
			wasm.get_time(3, false),
			wasm.get_time(3, true),
			wasm.get_time(4, false),
			wasm.get_time(4, true),
			wasm.get_time(5, false)
		];
	}

	if (hoursLock && hours === (closingTime - 4)) {
		return [
			wasm.get_time(3, false),
			wasm.get_time(3, true),
			wasm.get_time(4, false)
		];
	}

	if (hoursLock && hours === (closingTime - 3)) {
		return [
			wasm.get_time(3, false)
		];
	}

	if (hoursLock && ((hours === (closingTime - 1) && minutes < 15) || hours === (closingTime - 2))) {
		return 'asap';
	}

	if (hoursLock && ((hours === (closingTime - 1) && minutes > 15) || hours >= closingTime || hours < openingTime)) {
		return null;
	}

	return [
		wasm.get_time(3, false),
		wasm.get_time(3, true),
		wasm.get_time(4, false),
		wasm.get_time(4, true),
		wasm.get_time(5, false),
		wasm.get_time(5, true)
	];
};

