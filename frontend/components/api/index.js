import gql from 'graphql-tag';

// Mutation to create a new order
const CREATE_ORDER = gql`	
	mutation CreateOrder (
		$type: String!
		$size: String!
		$dough: String!
		$name: String!
		$phone: String!
		$time: String!
		$city: String!
		$street: String!
	) {
		createOrder(
			status: "in progress"
			type: $type
			size: $size
			dough: $dough
			name: $name
			phone: $phone
			time: $time
			city: $city
			street: $street
		) {
			id
		}
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

export {
	CREATE_ORDER,
	GET_ORDERS,
	CHANGE_ORDER_STATUS,
	DELETE_ORDER
};
