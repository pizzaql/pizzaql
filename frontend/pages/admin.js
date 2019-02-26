import React from 'react';
import {createGlobalStyle} from 'styled-components';
import 'core-js/modules/es6.regexp.to-string';

import {Button, Card, Position, Toaster, Spinner} from '@blueprintjs/core';
import gql from 'graphql-tag';
import {ApolloProvider, Query, Mutation} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import secureTemplate from '../static/secure-template';

const client = new ApolloClient({
	uri: 'http://localhost:4466'
});

// Global Style
const GlobalStyle = createGlobalStyle`
body {
    font-family: Montserrat, Georgia, monospace;
    text-align: center;
    background: #fff;
    font-size: 16;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed 
}

h1 {
    font-size: 30px;
}

h2 {
    font-size: 18px;
}

.half-width {
    margin: auto;
    margin-bottom: 20px;
    word-wrap: break-word;
    width: 60% 
}

.inline {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: right 
}

table {
    table-layout: fixed;
    word-wrap: break-word;
    width: 100% 
}
`;

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

const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(where: {id: $id}) {
      id
    }
  }
`;

const Secret = () => {
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
		<ApolloProvider client={client}>
			<div className="container">
				<h1>Welcome to Admin Dashboard</h1>

				<p>✔️ You are logged in, click <a href="/logout">here</a> to logout.</p>
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

						/* eslint-disable no-prototype-builtins */
						function isEmpty(obj) {
							for (const key in obj) {
								if (obj.hasOwnProperty(key)) {
									return false;
								}
							}

							return true;
						}
						/* eslint-enable no-prototype-builtins */

						if (isEmpty(data.orders)) {
							return <p>No orders found!</p>;
						}

						return (
							<div>
								{data.orders.reverse().map(el => (
									<Card className="half-width" key={el.id}>
										<h2>Order id. <strong>{el.id}</strong></h2>
										<br/>
										<table className="bp3-html-table .bp3-interactive .bp3-html-table-bordered">
											<thead>
												<tr>
													<th>Type</th>
													<th>Size</th>
													<th>Dough</th>
													<th>Name</th>
													<th>Phone</th>
													<th>City</th>
													<th>Street</th>
													<th>Time</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>{el.type}</td>
													<td>{el.size}</td>
													<td>{el.dough}</td>
													<td>{el.name}</td>
													<td>{el.phone}</td>
													<td>{el.city}</td>
													<td>{el.street}</td>
													<td>{el.time}</td>
												</tr>
											</tbody>
										</table>
										<Mutation
											mutation={DELETE_ORDER}
										>
											{(deleteOrder, {loading, error}) => (
												<div>
													<Button
														icon="trash"
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
									</Card>
								))}
							</div>
						);
					}}
				</Query>
				<GlobalStyle/>
			</div>
		</ApolloProvider>
	);
};

export default secureTemplate(Secret);
