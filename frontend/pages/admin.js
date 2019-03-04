import React, {useState, useEffect} from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import theme from 'styled-theming';
import 'core-js/modules/es6.regexp.to-string';

import {Button, Callout, Icon, Position, Toaster, Spinner, Switch} from '@blueprintjs/core';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import secureTemplate from '../static/secure-template';

const background = theme('mode', {
	light: '#ffffff',
	dark: '#202B33'
});

// Global Style
const GlobalStyle = createGlobalStyle`
body {
    font-family: Montserrat, Georgia, monospace;
    background: ${background};
		width: 100%;
		margin: 0 auto 30px;
    max-width: 60em;
		padding-top: 20px;
		padding-left: 40px;
		padding-right: 40px;
		word-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed 
}

.half-width {
    margin-bottom: 30px;
    word-wrap: break-word;
}

.inline {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: right 
}
`;

// Query to get a list of orders
const GET_ORDERS = gql`
query {
		orders {
		id
		size
		dough
		type
		name
		phone
		time
		city
		street
		}
}
`;

// Mutation to delete an order using it's id
const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

const Secret = () => {
	const [theme, setTheme] = useState('light');

	const loadingSequence = () => {
		document.body.className = (localStorage.getItem('adminBodyTheme') || 'bp3-body');
		setTheme(localStorage.getItem('adminTheme') || 'light');
	};

	useEffect(() => {
		loadingSequence();
	}, [loadingSequence]);

	const changeTheme = async () => {
		await localStorage.setItem('adminTheme', theme === 'light' || undefined ? 'dark' : 'light');
		await localStorage.setItem('adminBodyTheme', theme === 'light' || undefined ? 'bp3-dark' : 'bp3-body');
		document.body.className = (localStorage.getItem('adminBodyTheme'));
		setTheme(localStorage.getItem('adminTheme'));
	};

	const completeOrder = async () => {
		const AppToaster = await Toaster.create({
			position: Position.BOTTOM_RIGHT
		});

		AppToaster.show({
			message: 'Order deleted!',
			intent: 'danger',
			icon: 'trash',
			timeout: 3000
		});
	};

	return (
		<ThemeProvider theme={{mode: theme}}>
			<div className="container">
				<h1 className="bp3-heading">Welcome to Dashboard!</h1>
				<br/>

				<p><Icon intent="success" icon="tick-circle" iconSize={18}/> You are logged in, click <a href="/logout">here</a> to logout.</p>
				<br/>
				<Switch checked={!(theme === 'light' || undefined)} label="Dark Mode" onChange={changeTheme}/>
				<br/>
				<br/>
				<Query query={GET_ORDERS}>
					{({loading, error, data}) => {
						if (loading) {
							return <Spinner/>;
						}

						if (error) {
							return <p>{error.toString()}</p>;
						}

						if (Object.keys(data.orders).length === 0) {
							return <p>No orders found!</p>;
						}

						return (
							<div>
								{data.orders.reverse().map(el => (
									<Callout title={'Order id. ' + el.id} icon="flag" className="half-width" key={el.id}>
										<ul>
											<li>Type: <strong>{el.type}</strong></li>
											<li>Size: <strong>{el.size}</strong></li>
											<li>Dough: <strong>{el.dough}</strong></li>
											<li>Name: <strong>{el.name}</strong></li>
											<li>Phone: <strong>{el.phone}</strong></li>
											<li>City: <strong>{el.city}</strong></li>
											<li>Street: <strong>{el.street}</strong></li>
											<li>Time: <strong>{el.time}</strong></li>
										</ul>
										<Mutation
											mutation={DELETE_ORDER}
											update={(cache, {data: {deleteOrder}}) => {
												const {orders} = cache.readQuery({query: GET_ORDERS});

												const result = orders.filter(el => (deleteOrder.id.indexOf(el.id) === -1));

												cache.writeQuery({
													query: GET_ORDERS,
													data: {orders: result}
												});
											}}
										>
											{(deleteOrder, {loading, error}) => (
												<div>
													<Button
														icon="trash"
														intent="danger"
														key={el.id}
														data-order-id={el.id}
														onClick={e => {
															const orderID = e.currentTarget.attributes['data-order-id'].value;
															deleteOrder({variables: {id: orderID}});
															completeOrder();
														}}
													>
												Delete
													</Button>
													{loading && <p>Loading...</p>}
													{error && <p>Error :( Please try again</p>}
												</div>
											)}
										</Mutation>
									</Callout>
								))}
							</div>
						);
					}}
				</Query>
				<GlobalStyle/>
			</div>
		</ThemeProvider>
	);
};

export default secureTemplate(Secret);
