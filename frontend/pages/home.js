import React from 'react';
import Router from 'next/router';
import {createGlobalStyle} from 'styled-components';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import dayjs from 'dayjs';
import ky from 'ky';
import {Button, Card, Label} from '@blueprintjs/core';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
	font-family: Montserrat, Georgia, monospace;
	margin: auto;
	width: 60%;
	padding-top: 100px;
	padding-bottom: 100px;
    background: #fff;
    color: #212121;
	font-size: 16;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed
  }

  .small-width {
	  width: 200px;
  }

  .full-width {
	  width: 100%;
  }

  .inline {
	  display: flex;
	  flex-direction: row;
	  flex-wrap:wrap;
	  justify-content: space-around;
  }

  h1 {
	font-size: 30px;
  }

  footer {
	text-align: center;
  }
`;

// Template
const Home = () => (
	<Card>
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
				notes: ''
			}}
			validate={values => {
				const errors = {};
				if (!values.type) {
					errors.type = 'Required';
				}
				if (!values.size) {
					errors.size = 'Required';
				}
				if (!values.dough) {
					errors.dough = 'Required';
				}
				if (!values.time) {
					errors.time = 'Required';
				}
				if (isNaN(values.phone)) {
					errors.phone = 'Invalid Phone';
				}
				return errors;
			}}
			onSubmit={(values, {setSubmitting, resetForm}) => {
				setTimeout(async () => {
					// Form a GraphQL mutation to create a new order
					const query = `
					mutation {
						createOrder(
							data: {
								size: "${values.size}"
								dough: "${values.dough}"
								type: "${values.type}"
								name: "${values.name}"
								phone: "${values.phone}"
								time: "${values.time}"
								city: "${values.city}"
								street: "${values.street}"
							}
						) {
							id
						}
					}`;

					try {
						// Post a mutation to Prisma and obtain an ID
						const id = await ky.post('http://localhost:4466', {json: {query}}).json();
						const orderID = JSON.stringify(id.data.createOrder.id);
						// Move user to the thank you page
						Router.push({
							pathname: '/order',
							query: {id: orderID}
						});
					} catch (error) {
						console.log(error);
					}
					// Disable double-submission and reset form
					setSubmitting(false);
					resetForm();
				}, 500);
			}}
		>
			{({isSubmitting}) => (
				<Form>
					<div className="inline">
						<Label>
							Pizza Type:
							<div className="bp3-select small-width">
								<Field name="type" component="select" placeholder="Pizza Type">
									<option>Select</option>
									<option value="Margharita">Margharita</option>
									<option value="Pepperoni">Pepperoni</option>
									<option value="BBQ Chicken">BBQ Chicken</option>
								</Field>
								<ErrorMessage name="type" component="div"/>
							</div>
						</Label>
						<Label>
							Size:
							<div className="bp3-select small-width">
								<Field name="size" component="select" placeholder="Size">
									<option>Select</option>
									<option value="Small">Small</option>
									<option value="Medium">Medium</option>
									<option value="Large">Large</option>
									<option value="Extra Large">Extra Large</option>
								</Field>
								<ErrorMessage name="size" component="div"/>
							</div>
						</Label>
						<Label>
							Dough:
							<div className="bp3-select small-width">
								<Field name="dough" component="select" placeholder="Dough">
									<option>Select</option>
									<option value="Thin">Thin</option>
									<option value="Thick">Thick</option>
								</Field>
								<ErrorMessage name="dough" component="div"/>
							</div>
						</Label>
					</div>
					<br/>
					<br/>
					<Label>
							Full name:
						<Field className="bp3-input full-width" type="text" name="name" placeholder="Mark Suckerberg" required/>
					</Label>
					<Label>
							Phone:
						<Field className="bp3-input full-width" type="tel" name="phone" placeholder="666666666" required/>
						<ErrorMessage name="phone"/>
					</Label>
					<Label>
							City:
						<Field className="bp3-input full-width" type="text" name="city" placeholder="Menlo Park" required/>
					</Label>
					<Label>
							Street & Apartment Number:
						<Field className="bp3-input full-width" type="text" name="street" placeholder="1 Hacker Way" required/>
					</Label>
					<br/>
					<Label>
							Delivery time:
						<div className="bp3-select small-width .modifier">
							<Field name="time" component="select" placeholder="Time">
								<option>Select</option>
								<option value="ASAP">As fast as possible</option>
								<option>{dayjs().startOf('hour').add(1, 'hour').format('HH:mm')}</option>
								<option>{dayjs().startOf('hour').add(2, 'hour').format('HH:mm')}</option>
								<option>{dayjs().startOf('hour').add(3, 'hour').format('HH:mm')}</option>
							</Field>
						</div>
						<ErrorMessage name="time" component="div"/>
					</Label>
					<br/>
					<br/>
					<Button
						className="full-width"
						type="submit"
						disabled={isSubmitting}
					>
						Submit!
					</Button>
				</Form>
			)}
		</Formik>
		<footer>
			<br/>
			<p>Powered by PizzaQL 🍕</p>
		</footer>
		<GlobalStyle/>
	</Card>
);

export default Home;
