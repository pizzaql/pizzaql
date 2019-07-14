import React, {useState} from 'react';
import {Alert, Button, Callout, Icon, Position, Intent, Toaster, Spinner} from '@blueprintjs/core';
import {Query, Mutation} from 'react-apollo';
import secureTemplate from '../static/auth/secure-template';

import Container from '../components/dashboard/container';
import Grid from '../components/dashboard/grid';
import ButtonGroup from '../components/dashboard/button-group';

import {GET_ORDERS, CHANGE_ORDER_STATUS, DELETE_ORDER} from '../components/api';

const Secret = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState('');

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

	return (
		<Container>
			<h1 className="bp3-heading">Welcome to Dashboard!</h1>
			<br/>

			<p><Icon intent="success" icon="tick-circle" iconSize={18}/> You are logged in, click <a href="/logout">here</a> to logout.</p>
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
						<Grid>
							{data.orders.reverse().map(el => (
								<Callout
									style={{marginBottom: '30px'}}
									title={`Order id. ${el.id.slice(18)}`}
									intent={el.status === 'completed' ? 'success' : 'none' || el.status === 'cancelled' ? 'warning' : 'none'}
									icon="flag"
									key={el.id}
								>
									<p>Status: {el.status}</p>
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
									<ButtonGroup>
										<Mutation
											mutation={CHANGE_ORDER_STATUS}
										>
											{(updateOrder, {loading, error}) => (
												<>
													<Button
														style={{margin: '5px'}}
														icon="tick"
														intent="primary"
														loading={loading}
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
													{error && <p>Error :( Please try again</p>}
												</>
											)}
										</Mutation>
										<Mutation
											mutation={CHANGE_ORDER_STATUS}
										>
											{(updateOrder, {loading, error}) => (
												<>
													<Button
														style={{margin: '5px'}}
														icon="cross"
														intent="warning"
														loading={loading}
														disabled={el.status === 'cancelled'}
														key={el.id}
														data-order-id={el.id}
														onClick={e => {
															const orderID = e.currentTarget.attributes['data-order-id'].value;
															updateOrder({variables: {status: 'cancelled', id: orderID}});
															showToaster('Status changed!', error);
														}}
													>
												Cancel
													</Button>
													{error && <p>Error :( Please try again</p>}
												</>
											)}
										</Mutation>
										<Mutation
											mutation={DELETE_ORDER}
											update={(cache, {data: {deleteOrder}}) => {
												const {orders} = cache.readQuery({query: GET_ORDERS});

												const result = orders.reverse().filter(el => (deleteOrder.id.indexOf(el.id) === -1));

												cache.writeQuery({
													query: GET_ORDERS,
													data: {orders: result}
												});
											}}
										>
											{(deleteOrder, {loading, error}) => (
												<>
													<Button
														style={{margin: '5px'}}
														icon="trash"
														intent="danger"
														loading={loading}
														key={el.id}
														data-order-id={el.id}
														onClick={e => {
															setId(e.currentTarget.attributes['data-order-id'].value);
															setIsOpen(true);
														}}
													>
												Delete
													</Button>
													<Alert
														cancelButtonText="Cancel"
														confirmButtonText="Delete"
														icon="trash"
														intent={Intent.DANGER}
														isOpen={isOpen}
														onCancel={() => {
															setIsOpen(false);
														}}
														data-order-id={el.id}
														onConfirm={async () => {
															await deleteOrder({variables: {id}});
															await setIsOpen(false);
															await setId('');
															showToaster('Order deleted!', error);
														}}
													>
														<p>
                        Are you sure you want delete this order? You will not be able to restore it later.
														</p>
													</Alert>
													{error && <p>Error :( Please try again</p>}
												</>
											)}
										</Mutation>
									</ButtonGroup>
								</Callout>
							))}
						</Grid>
					);
				}}
			</Query>
		</Container>
	);
};

export default secureTemplate(Secret);
