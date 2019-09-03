import config from '../../config';

const {pizzas, thickDough, restaurant} = config;
const {currency} = restaurant;

// Calculate price and display it to user in a friendly format
const calculatePrice = (type, size, dough) => {
	if (!type || !size || !dough) {
		return `0.00 ${currency || '$'}`;
	}

	const price = pizzas[type].prices[size];

	if (dough === 'Thick') {
		return `${price + thickDough}.00 ${currency || '$'}`;
	}

	return `${price}.00 ${currency || '$'}`;
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
