'use strict';

const config = {
	auth0: { // Auth0 configuration
		clientID: 'BUUYjCiP2SYKQBB48OZRALsccmijoubx',
		domain: 'pizzaql.eu.auth0.com'
	},
	stripe: { // Stripe configuration
		key: 'pk_test_A6mUVOGtiDJwvnJsg1AmoNxO'
	},
	restaurant: { // Basic restaurant options
		name: 'PizzaQL',
		phone: 693827127,
		openingTime: 10, // Time your restaurant opens (currently only full hours are supported)
		closingTime: 19, // Time your restaurant closes (currently only full hours are supported)
		hoursLock: false, // Show available delivery time based on the current hour (recommended in production)
		currency: 'PLN', // Currency code, in which you will be processing payments
		allowOrdersDeletion: true, // Whether you want to allow order deletion or not
		validatePhoneNumbers: true // Whether you want the system to validate phone numbers
	},
	pizzas: { // Pizzas
		Margharita: {
			ingredients: [
				'Mozzarella',
				'Oregano'
			],
			prices: {
				Small: 17,
				Medium: 20,
				Large: 23
			}
		},
		Funghi: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Mushrooms'
			],
			prices: {
				Small: 20,
				Medium: 23,
				Large: 26
			}
		},
		Cacciatore: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Salami'
			],
			prices: {
				Small: 16,
				Medium: 19,
				Large: 22
			}
		},
		Vesuvio: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Ham'
			],
			prices: {
				Small: 19,
				Medium: 22,
				Large: 25
			}
		},
		Capriciosa: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Ham',
				'Mushrooms'
			],
			prices: {
				Small: 20,
				Medium: 23,
				Large: 26
			}
		},
		Prosciutto: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Prosciutto Cotto'
			],
			prices: {
				Small: 21,
				Medium: 24,
				Large: 27
			}
		},
		Hawaiano: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Ham',
				'Pineapple'
			],
			prices: {
				Small: 21,
				Medium: 24,
				Large: 27
			}
		},
		Fiorentina: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Ham',
				'Mushrooms',
				'Black Olives',
				'Capers'
			],
			prices: {
				Small: 20,
				Medium: 23,
				Large: 26
			}
		},
		Bali: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Grilled Chicken',
				'Mushrooms',
				'Pineapple'
			],
			prices: {
				Small: 22,
				Medium: 25,
				Large: 28
			}
		},
		Pepperoni: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Salami Pepperoni'
			],
			prices: {
				Small: 20,
				Medium: 23,
				Large: 26
			}
		},
		Pescatore: {
			ingredients: [
				'Mozzarella',
				'Oregano',
				'Tuna',
				'Black Olives',
				'Capers'
			],
			prices: {
				Small: 20,
				Medium: 23,
				Large: 26
			}
		}
	},
	thickDough: 3 // How much should thick dough add to the final price?
};

export default config;
