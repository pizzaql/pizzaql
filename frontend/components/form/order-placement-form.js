import React from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {Checkbox, Radio, RadioGroup} from '@blueprintjs/core';
import {Formik, Form} from 'formik';
import {Persist} from 'formik-persist';
import {useMutation} from '@apollo/react-hooks';
import StripeCheckout from 'react-stripe-checkout';
import * as Yup from 'yup';

import {CREATE_ORDER} from '../api';
import config from '../../config';
import SelectGroup from './select-group';
import TypeSelect from './type-select';
import SizeSelect from './size-select';
import DoughSelect from './dough-select';
import Price from './price';
import {calculatePrice, calculateAmountToPay} from './price-calculator';
import Input from './input';
import Submit from './submit';

const {stripe, restaurant} = config;

const TimeSelect = dynamic(() => import('./time-select'));
const StripeButton = dynamic(() => import('./stripe-button'));

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
	const [createOrder, {loading, error}] = useMutation(CREATE_ORDER);

	// Devlopment message about hours lock
	if (restaurant.hoursLock) {
		console.log('%c PizzaQL', 'color: black; background: #fba627; font-size: 14px; border-radius: 3px;', 'Hours Lock is enabled!');
	}

	return (
		<Formik
			initialValues={{
				type: '',
				size: '',
				dough: '',
				name: '',
				phone: '',
				city: '',
				street: '',
				time: '',
				onlinePayment: false
			}}
			validationSchema={OrderSchema}
			onSubmit={async (values, {setSubmitting, resetForm}) => {
				await setSubmitting(false);

				if (values.onlinePayment) {
					await createOrder({
						variables: {
							type: values.type,
							size: values.size,
							dough: values.dough,
							name: values.name,
							phone: values.phone,
							time: values.time,
							city: values.city,
							street: values.street,
							paid: true,
							price: calculatePrice(values.type, values.size, values.dough)
						}
					}).then(async data => {
						const orderID = await data.data.createOrder.id;

						// https://github.com/jaredpalmer/formik-persist/issues/16
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
				} else {
					await createOrder({
						variables: {
							type: values.type,
							size: values.size,
							dough: values.dough,
							name: values.name,
							phone: values.phone,
							time: values.time,
							city: values.city,
							street: values.street,
							paid: false,
							price: calculatePrice(values.type, values.size, values.dough)
						}
					}).then(async data => {
						const orderID = await data.data.createOrder.id;

						// https://github.com/jaredpalmer/formik-persist/issues/16
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
				}
			}}
		>
			{props => (
				<Form>
					<SelectGroup>
						<TypeSelect value={props.values.type} onChangeText={props.handleChange('type')}/>
						<SizeSelect value={props.values.size} onChangeText={props.handleChange('size')}/>
						<DoughSelect value={props.values.dough} onChangeText={props.handleChange('dough')}/>
					</SelectGroup>
					<br/>
					<Price amount={calculatePrice(props.values.type, props.values.size, props.values.dough)}/>
					<br/>
					<Input value={props.values.name} onChangeText={props.handleChange('name')} label="Full Name:" type="text" name="name" placeholder="Mark Suckerberg" required/>
					<Input value={props.values.phone} onChangeText={props.handleChange('phone')} label="Phone:" type="tel" name="phone" placeholder="666666666" required/>
					<Input value={props.values.street} onChangeText={props.handleChange('street')} label="Address:" type="text" name="street" placeholder="1 Hacker Way" required/>
					<Input value={props.values.city} onChangeText={props.handleChange('city')} label="City:" type="text" name="city" placeholder="Menlo Park" required/>
					<br/>
					<TimeSelect value={props.values.time} onChangeText={props.handleChange('time')}/>
					<br/>
					<RadioGroup
						name="payment"
						label="Choose payment option"
						onChange={() => {
							if (props.values.onlinePayment === false) {
								props.setFieldValue('onlinePayment', true);
							} else {
								props.setFieldValue('onlinePayment', false);
							}
						}}
						selectedValue={props.values.onlinePayment === false ? 'delivery' : 'online'}
						required
					>
						<Radio label="On delivery" value="delivery"/>
						<Radio label="Online" value="online"/>
					</RadioGroup>
					<br/>
					<Checkbox required>
    I accept your <Link href="/tos"><a>terms of service</a></Link> and <Link href="/privacy"><a>privacy policy</a></Link>.
					</Checkbox>
					<br/>
					{props.values.onlinePayment ?
						<StripeCheckout
							token={props.handleSubmit}
							stripeKey={stripe.key}
							name={restaurant.name || 'PizzaQL'}
							label="Pay using Stripe"
							amount={calculateAmountToPay(props.values.type, props.values.size, props.values.dough)}
							currency={restaurant.currency || 'USD'}
						>
							<StripeButton loading={loading}/>
						</StripeCheckout> :
						<Submit loading={loading}/>}
					{error && <p>Something went wrong. Try again later.</p>}
					<Persist name="order-placement-from" debounce={100}/>
				</Form>
			)}
		</Formik>
	);
};

export default OrderPlacementForm;
