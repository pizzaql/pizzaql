import React from 'react';
import {Callout, Divider, Icon, Tooltip, Spinner} from '@blueprintjs/core';
import {useQuery} from '@apollo/react-hooks';

import {GET_ORDERS} from '../api';
import Grid from './grid';
import ButtonGroup from './button-group';
import UpdateOrder from './utils/update-order';
import DeleteOrder from './utils/delete-order';

const Orders = () => {
	const {loading, error, data} = useQuery(GET_ORDERS, {
		pollInterval: 2000
	});

	if (loading) {
		return <Spinner/>;
	}

	if (error) {
		return <p>Something went wrong: {error.toString()}</p>;
	}

	if (Object.keys(data.orders).length === 0) {
		return <p>No orders found!</p>;
	}

	return (
		<Grid>
			{data.orders.reverse().map(el => (
				<Callout
					style={{marginBottom: '20px'}}
					title={`Order ${el.id}`}
					intent={el.status === 'completed' ? 'success' : ('' || el.status === 'cancelled' ? 'warning' : '')}
					icon={el.status === 'completed' ? 'tick' : ('' || el.status === 'cancelled' ? 'cross' : '')}
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
					<p>Price: {el.price} {el.paid ?
						<Tooltip content="This order WAS paid online">
							<Icon intent="success" icon="small-tick" iconSize={18}/>
						</Tooltip> :
						<Tooltip content="This order WAS NOT paid online">
							<Icon intent="danger" icon="small-cross" iconSize={18}/>
						</Tooltip>}
					</p>
					<ButtonGroup>
						<UpdateOrder
							icon="tick"
							intent="primary"
							disabled={el.status === 'completed'}
							id={el.id}
							status="completed"
						/>
						<UpdateOrder
							icon="cross"
							intent="warning"
							disabled={el.status === 'cancelled'}
							id={el.id}
							status="cancelled"
						/>
						<Divider/>
						<DeleteOrder orderId={el.id}/>
					</ButtonGroup>
				</Callout>
			))}
		</Grid>
	);
};

export default Orders;
