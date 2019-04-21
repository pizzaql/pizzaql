import React from 'react';
import Router from 'next/router';
import {Formik, Form} from 'formik';
import {Persist} from 'formik-persist';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import * as Yup from 'yup';

// Import components
import SelectGroup from './select-group';
import TypeSelect from './type-select';
import SizeSelect from './size-select';
import DoughSelect from './dough-select';
import Input from './input';
import TimeSelect from './time-select';
import Submit from './submit';

// Validation
const OrderSchema = Yup.object().shape({
	type: Yup.string()
		.required('Required!'),
	size: Yup.string()
		.required('Required!'),
	dough: Yup.string()
		.required('Required!'),
	name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		// Regex for checking full name, https://stackoverflow.com/a/45871742
		.matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, 'Invalid name!'),
	phone: Yup.string()
		// Regular expression for checking Polish phone numbers, https://github.com/skotniczny/phonePL
		.matches(/^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5\d|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/, 'Invalid phone number!'),
	city: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!'),
	street: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
});

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

const OrderPlacementForm = () => {
	return (
		<Mutation
			mutation={CREATE_ORDER}
		>
			{(createOrder, {loading, error}) => (
				<Formik
					initialValues={{
						type: '',
						size: '',
						dough: '',
						name: '',
						phone: '',
						city: '',
						street: '',
						time: ''
					}}
					validationSchema={OrderSchema}
					onSubmit={(values, {setSubmitting, resetForm}) => {
						setTimeout(async () => {
							createOrder({
								variables: {
									type: values.type,
									size: values.size,
									dough: values.dough,
									name: values.name,
									phone: values.phone,
									time: values.time,
									city: values.city,
									street: values.street
								}
							}).then(data => {
								const orderID = data.data.createOrder.id.slice(18);
								// Move user to the thank you page
								Router.push({
									pathname: '/order',
									query: {id: orderID}
								});
							}).catch(error => {
								console.log(error);
							});

							await setSubmitting(false);

							// Call resetForm twice to delete values from localstorage, https://github.com/jaredpalmer/formik-persist/issues/16
							resetForm();
							resetForm();
						}, 500);
					}}
				>
					{({isSubmitting}) => (
						<Form>
							<SelectGroup>
								<TypeSelect/>
								<SizeSelect/>
								<DoughSelect/>
							</SelectGroup>
							<br/>
							<br/>
							<Input label="Full Name:" type="text" name="name" placeholder="Mark Suckerberg" required/>
							<Input label="Phone:" type="tel" name="phone" placeholder="666666666" required/>
							<Input label="Address:" type="text" name="street" placeholder="1 Hacker Way" required/>
							<Input label="City:" type="text" name="city" placeholder="Menlo Park" required/>
							<br/>
							<TimeSelect/>
							<br/>
							<br/>
							<Submit loading={isSubmitting || loading} disabled={isSubmitting}/>
							{error && <p>Something went wrong! Try again later</p>}
							<Persist name="order-placement-form"/>
						</Form>
					)}
				</Formik>
			)}
		</Mutation>
	);
};

export default OrderPlacementForm;
