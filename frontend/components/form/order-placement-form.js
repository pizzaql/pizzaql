import React, {useState, useMemo} from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {Checkbox, Label, Radio, RadioGroup} from '@blueprintjs/core';
import {useFormState} from 'react-use-form-state';
import {useMutation} from '@apollo/react-hooks';
import StripeCheckout from 'react-stripe-checkout';

import {CREATE_ORDER} from '../api';
import config from '../../config';
import SelectGroup from './select-group';
import Price from './price';
import {calculatePrice, calculateAmountToPay} from './utils/price-calculator';
import Input from './input';
import Submit from './submit';

const {stripe, restaurant} = config;

import pizzaTypes from './utils/pizza-types';
import hoursSelect from './utils/hours-helper';

const OrderPlacementForm = () => {
	const [fieldError, setFieldError] = useState(null);
	const [formState, {text, select}] = useFormState({
		type: '',
		size: '',
		dough: '',
		name: '',
		phone: '',
		city: '',
		street: '',
		time: '',
		onlinePayment: false
	});
	const [createOrder, {loading, error}] = useMutation(CREATE_ORDER);

	const handleSubmit = async e => {
		try {
			e.preventDefault();
		} catch (error) {
			console.log(error);
		} finally {
			const {values} = formState;

			// Phone number validation
			if (
				!(values.phone).match(/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5\d|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/g) &&
			restaurant.validatePhoneNumbers
			) {
				setFieldError(
					<>
						<b>Invalid phone number!</b>
						<br/>
						<br/>
					</>
				);
			} else if (values.onlinePayment) {
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

					// Move user to the thank you page
					Router.push({
						pathname: '/order',
						query: {id: orderID}
					});
				}).catch(error => {
					console.log(error);
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<SelectGroup>
				<Label style={{width: '11rem', userSelect: 'none'}}>
					Pizza Type:
					<div className="bp3-select">
						<select {...select('type')} name="type" required>
							<option value="">Select</option>
							{useMemo(() => pizzaTypes(), [])}
						</select>
					</div>
				</Label>
				<Label style={{width: '11rem', userSelect: 'none'}}>
    Size:
					<div className="bp3-select">
						<select {...select('size')} name="size" required>
							<option value="">Select</option>
							<option value="Small">Small</option>
							<option value="Medium">Medium</option>
							<option value="Large">Large</option>
						</select>
					</div>
				</Label>
				<Label style={{width: '11rem', userSelect: 'none'}}>
    Dough:
					<div className="bp3-select">
						<select {...select('dough')} name="dough" required>
							<option value="">Select</option>
							<option value="Thin">Thin</option>
							<option value="Thick">Thick</option>
						</select>
					</div>
				</Label>
			</SelectGroup>
			<br/>
			<Price amount={calculatePrice(formState.values.type, formState.values.size, formState.values.dough)}/>
			<br/>
			<Label>
				Full name:
				<Input
					{...text('name')}
					className="bp3-input"
					type="text"
					name="name"
					placeholder="Mark Zuckerberg"
					required
				/>
			</Label>
			<Label>
				Phone:
				<Input
					{...text('phone')}
					className="bp3-input"
					type="tel"
					name="phone"
					placeholder="666666666"
					required
				/>
			</Label>
			{fieldError}
			<Label>
				Address:
				<Input {...text('street')} className="bp3-input" type="text" name="street" placeholder="1 Hacker Way" required/>
			</Label>
			<Label>
				City:
				<Input {...text('city')} className="bp3-input" type="text" name="city" placeholder="Menlo Park" required/>
			</Label>
			<br/>
			<Label style={{width: '11rem', userSelect: 'none'}}>
		Delivery time:
				<div className="bp3-select">
					<select {...select('time')} name="time" required>
						{useMemo(() => hoursSelect(), [])}
					</select>
				</div>
			</Label>
			<br/>
			<RadioGroup
				name="payment"
				label="Choose payment option"
				onChange={() => {
					if (formState.values.onlinePayment === false) {
						formState.setField('onlinePayment', true);
					} else {
						formState.setField('onlinePayment', false);
					}
				}}
				selectedValue={formState.values.onlinePayment === false ? 'delivery' : 'online'}
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
			{formState.values.onlinePayment ?
				<StripeCheckout
					token={handleSubmit}
					stripeKey={stripe.key}
					name={restaurant.name || 'PizzaQL'}
					label="Pay using Stripe"
					amount={calculateAmountToPay(formState.values.type, formState.values.size, formState.values.dough)}
					currency={restaurant.currency || 'USD'}
				>
					<Submit type="button" text="Submit & Pay" loading={loading}/>
				</StripeCheckout> :
				<Submit type="submit" text="Submit" loading={loading}/>}
			{error && <p>Something went wrong. Try again later.</p>}
		</form>
	);
};

export default OrderPlacementForm;
