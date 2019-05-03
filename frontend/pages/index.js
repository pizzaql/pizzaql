import React from 'react';
import {Card, Elevation} from '@blueprintjs/core';

// Import components
import Container from '../components/form/container';
import OrderPlacementForm from '../components/form/order-placement-form';
import Footer from '../components/form/footer';

// Load fonts & main page
const Index = () => {
	/*
	Allow placing orders between specific hours

	The first value (here 10) specifies the opening time
	The second value (here 19) specifies the closing time

	Note, that if your restaurant closes at 20, you should set the closing time to 19, so
	that you will have enough time to complete all the orders
	*/

	/*
	const isLocked = () => {
		const now = new Date();
		const hours = now.getHours();

		if (hours >= 10 && hours <= 19) {
			return false;
		}

		return true;
	};

	if (isLocked() === true) {
		return <p style={{color: 'black'}}>The restaurant is currently closed.</p>;
	}
	*/

	return (
		<Container>
			<Card elevation={Elevation.FOUR}>
				<OrderPlacementForm/>
				<Footer>
					<br/>
					<p>Powered by PizzaQL 🍕</p>
				</Footer>
			</Card>
		</Container>
	);
};

export default Index;
