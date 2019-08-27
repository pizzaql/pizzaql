import {gql} from 'apollo-boost';

// Query to get a list of orders
const GET_ORDERS = gql`
	query {
		orders {
			id
			status
			paid
			price
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

// Query to get information about an order using it's id
const GET_ORDER_BY_ID = gql`
	query Order($id: ID!) {
		order(id: $id) {
			id
			time
		}
	}
`;

// Mutation to create a new order
const CREATE_ORDER = gql`	
	mutation CreateOrder (
		$paid: Boolean!
		$price: String!
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
			paid: $paid
			price: $price
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
	GET_ORDERS,
	GET_ORDER_BY_ID,
	CREATE_ORDER,
	CHANGE_ORDER_STATUS,
	DELETE_ORDER
};
