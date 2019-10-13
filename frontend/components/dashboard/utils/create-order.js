import React, {useState} from 'react';
import {Dialog, Button} from '@blueprintjs/core';
import {Formik, Form} from 'formik';
import {useMutation} from '@apollo/react-hooks';
import * as Yup from 'yup';

import {CREATE_ORDER, GET_ORDERS} from '../../api';
import {calculatePrice} from '../../form/price-calculator';

import SelectGroup from '../../form/select-group';
import TypeSelect from '../../form/type-select';
import SizeSelect from '../../form/size-select';
import DoughSelect from '../../form/dough-select';
import Input from '../../form/input';
import Price from '../../form/price';
import Submit from '../../form/submit';
import showToaster from './show-toaster';

// Custom form validation
const OrderSchema = Yup.object().shape({
	name: Yup.string()
		// Regex for checking full name, https://stackoverflow.com/a/45871742
		.matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Invalid name!'),
	phone: Yup.string()
		// Regular expression for checking Polish phone numbers, https://github.com/skotniczny/phonePL
		.matches(/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5\d|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/, 'Invalid phone number!')
});

const CreateOrder = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [createOrder, {loading, error}] = useMutation(
		CREATE_ORDER,
		{
			update(cache, {data: {createOrder}}) {
				const {orders} = cache.readQuery({query: GET_ORDERS});

				cache.writeQuery({
					query: GET_ORDERS,
					data: {orders: orders.unshift(createOrder)}
				});
			}
		}
	);

	return (
		<>
			<Button
				style={{marginBottom: '1em'}}
				icon="add"
				loading={loading}
				onClick={() => {
					setIsOpen(true);
				}}
			>
      Add order
			</Button>
			<Dialog
				style={{width: '100%', maxWidth: '50em', margin: '5vw', padding: '2em'}}
				title="Add new order"
				icon="info-sign"
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
			>
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
						}).then(async () => {
						// https://github.com/jaredpalmer/formik-persist/issues/16
							await resetForm();
							await resetForm();

							await setIsOpen(false);

							showToaster('Order added!');
						}).catch(error => {
							console.log(error);
						});
					}}
				>
					{props => (
						<Form>
							<br/>
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
							<Input value={props.values.time} onChangeText={props.handleChange('time')} label="Delivery time:" type="text" name="time" placeholder="12:00" required/>
							<br/>
							<Submit loading={loading}/>
							{error && <p>Something went wrong. Try again later.</p>}
						</Form>
					)}
				</Formik>
			</Dialog>
			{error && <p>Error :( Please try again</p>}
		</>
	);
};

export default CreateOrder;
