import React, {useState, useEffect} from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import theme from 'styled-theming';
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
    text-rendering: optimizeSpeed;
}

.half-width {
    margin-bottom: 30px;
    word-wrap: break-word;
}

.complete {
	margin-right: 5px;
}

.buttons {
    display: flex;
    flex-direction: row;
		justify-content: flex-start;
    text-align: right;
}

.inline {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: right;
}
`;

// Query to get a list of orders
const GET_ORDERS = gql`
query {
		orders {
		id
		status
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

// Mutation to update order status
const CHANGE_ORDER_STATUS = gql`	
	mutation UpdateOrder($status: String!, $id: ID!) {
		updateOrder(
			status: $status
			id: $id
		) {
			status
			id
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
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		document.body.className = (localStorage.getItem('adminBodyTheme') || 'bp3-body');
		setTheme(localStorage.getItem('adminTheme') || 'light');
		setLoaded(true);
	}, []);

	const changeTheme = async () => {
		await localStorage.setItem('adminTheme', theme === 'light' || undefined ? 'dark' : 'light');
		await localStorage.setItem('adminBodyTheme', theme === 'light' || undefined ? 'bp3-dark' : 'bp3-body');
		document.body.className = (localStorage.getItem('adminBodyTheme'));
		setTheme(localStorage.getItem('adminTheme'));
	};

	const showToaster = async (message, error) => {
		const AppToaster = await Toaster.create({
			position: Position.BOTTOM_RIGHT
		});

		if (error) {
			AppToaster.show({
				message: 'Something went wrong!',
				intent: 'error',
				icon: 'trash',
				timeout: 3000
			});
		}

		AppToaster.show({
			message,
			intent: 'success',
			icon: 'tick',
			timeout: 3000
		});
	};

	if (loaded === false) {
		return null;
	}

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
									<Callout
										title={`Order id. ${el.id.slice(-3)} || Status: ${el.status}`}
										intent={el.status === 'completed' ? 'success' : ''}
										icon={el.status === 'completed' ? 'tick' : 'flag'}
										className="half-width"
										key={el.id}
									>
										<ul>
											<li>Type: <strong>{el.type}</strong></li>
											<li>Size: <strong>{el.size}</strong></li>
											<li>Dough: <strong>{el.dough}</strong></li>
											<li>Name: <strong>{el.name}</strong></li>
											<li>Phone: <strong>{el.phone}</strong></li>
											<li>Street: <strong>{el.street}</strong></li>
											<li>City: <strong>{el.city}</strong></li>
											<li>Time: <strong>{el.time}</strong></li>
										</ul>
										<div className="buttons">
											<Mutation
												mutation={CHANGE_ORDER_STATUS}
											>
												{(updateOrder, {loading, error}) => (
													<div>
														<Button
															className="complete"
															icon="tick"
															intent="primary"
															disabled={el.status === 'completed'}
															key={el.id}
															data-order-id={el.id}
															onClick={e => {
																const orderID = e.currentTarget.attributes['data-order-id'].value;
																updateOrder({variables: {status: 'completed', id: orderID}});
																showToaster('Status changed!', error);
															}}
														>
												Complete
														</Button>
														{loading && <p>Loading...</p>}
														{error && <p>Error :( Please try again</p>}
													</div>
												)}
											</Mutation>
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
																showToaster('Order deleted!', error);
															}}
														>
												Delete
														</Button>
														{loading && <p>Loading...</p>}
														{error && <p>Error :( Please try again</p>}
													</div>
												)}
											</Mutation>
										</div>
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
