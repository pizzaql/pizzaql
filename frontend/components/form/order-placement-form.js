import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {Checkbox} from '@blueprintjs/core';
import {Formik, Form} from 'formik';
import {Persist} from 'formik-persist';
import {Mutation} from 'react-apollo';
import * as Yup from 'yup';

import {CREATE_ORDER} from '../api';
import SelectGroup from './select-group';
import TypeSelect from './type-select';
import SizeSelect from './size-select';
import DoughSelect from './dough-select';
import Input from './input';
import TimeSelect from './time-select';
import Submit from './submit';

// Custom form validation
const OrderSchema = Yup.object().shape({
	name: Yup.string()
		// Regex for checking full name, https://stackoverflow.com/a/45871742
		.matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Invalid name!'),
	phone: Yup.string()
		// Regular expression for checking Polish phone numbers, https://github.com/skotniczny/phonePL
		.matches(/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5\d|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/, 'Invalid phone number!')

});

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
					onSubmit={async (values, {setSubmitting, resetForm}) => {
						await setSubmitting(false);
						await createOrder({
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
						}).then(async data => {
							const orderID = await data.data.createOrder.id.slice(18);

							// Call resetForm twice to delete values from localstorage, https://github.com/jaredpalmer/formik-persist/issues/16
							await resetForm();
							await resetForm();

							// Move user to the thank you page
							Router.push({
								pathname: '/order',
								query: {id: orderID}
							});
						}).catch(error => {
							console.log(error);
						});
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
							<Checkbox required>
    I accept your <Link href="/privacy"><a>privacy policy</a></Link>.
							</Checkbox>
							<br/>
							<Submit loading={isSubmitting || loading} disabled={isSubmitting}/>
							{error && <p>Something went wrong. Try again later.</p>}
							<Persist name="order-placement-form"/>
						</Form>
					)}
				</Formik>
			)}
		</Mutation>
	);
};

export default OrderPlacementForm;
