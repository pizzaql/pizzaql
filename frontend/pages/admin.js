import {setTimeout} from 'timers';
import React, {useState, useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';
import {Button, Card, Position, Toaster, Spinner} from '@blueprintjs/core';
import {request} from 'graphql-request';
import secureTemplate from '../static/secure-template';
import fonts from './fonts';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
		font-family: Montserrat, Georgia, monospace;
  	text-align: center;
  	background: #fff;
  	color: #212121;
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

const Secret = () => {
	const [orders, setOrders] = useState([]);
	const [spinner, setSpinner] = useState(<Spinner/>);

	// Get all orders
	const getOrders = () => {
		setTimeout(async () => {
			// Query to get orders from Prisma
			const query = `
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
					}`;

			await request('http://localhost:4466', query).then(data => {
				setOrders(data.orders);
			}).catch(error => {
				console.log(error);
			});
		}, 2000);
	};

	const completeOrder = e => {
		const id = e.currentTarget.attributes['data-order-id'].value;

		e.loading = true;

		// Mutation to delete an order
		const query = `
		mutation {
			deleteOrder(where: { id: "${id}" }) {
			  id
			}
		  }`;

		request('http://localhost:4466', query).then(async () => {
			const AppToaster = await Toaster.create({
				position: Position.BOTTOM_RIGHT
			});

			setTimeout(() => {
				AppToaster.show({
					message: 'Order deleted!',
					intent: 'danger',
					icon: 'trash',
					timeout: 3000
				});
			}, 1000);
		}).catch(error => {
			console.log(error);
		});
	};

	useEffect(() => {
		fonts();
		setSpinner('');
	}, []);

	useEffect(() => {
		getOrders();
	});

	return (
		<div className="container">
			<h1>Welcome to Admin Dashboard</h1>

			<p>✔️ You are logged in, click <a href="/logout">here</a> to logout.</p>
			<br/>
			<br/>
			{spinner}
			{orders.reverse().map(el => (
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
					<Button icon="trash" data-order-id={el.id} onClick={completeOrder}>Delete</Button>
				</Card>
			))}
			<GlobalStyle/>
		</div>
	);
};

export default secureTemplate(Secret);
