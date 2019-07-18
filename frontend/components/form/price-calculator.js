import prices from './prices';

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
