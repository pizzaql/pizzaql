import prices from './prices';

// Calculate price and display it to user in a friendly format
const calculatePrice = (type, size, dough) => {
	if (!type || !size || !dough) {
		return '0.00 PLN';
	}

	const price = prices[type][size];

	if (dough === 'Thick') {
		return `${price + 3}.00 PLN`;
	}

	return `${price}.00 PLN`;
};

// Calculate the amount a user has to pay
const calculateAmountToPay = (type, size, dough) => {
	if (!type || !size || !dough) {
		return 0;
	}

	const price = prices[type][size];

	if (dough === 'Thick') {
		return (price + 3) * 100;
	}

	return price * 100;
};

export {
	calculatePrice,
	calculateAmountToPay
};
