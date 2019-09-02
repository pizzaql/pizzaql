import config from '../../config';

const {pizzas, thickDough} = config;

// Calculate price and display it to user in a friendly format
const calculatePrice = (type, size, dough) => {
	if (!type || !size || !dough) {
		return '0.00 PLN';
	}

	const price = pizzas[type].prices[size];

	if (dough === 'Thick') {
		return `${price + thickDough}.00 PLN`;
	}

	return `${price}.00 PLN`;
};

// Calculate the amount a user has to pay
const calculateAmountToPay = (type, size, dough) => {
	if (!type || !size || !dough) {
		return 0;
	}

	const price = pizzas[type].prices[size];

	if (dough === 'Thick') {
		return (price + thickDough) * 100;
	}

	return price * 100;
};

export {
	calculatePrice,
	calculateAmountToPay
};
