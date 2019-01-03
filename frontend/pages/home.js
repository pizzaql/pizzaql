import React from 'react';
import Router from 'next/router';
import {createGlobalStyle} from 'styled-components';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import ky from 'ky';
import './styles/styles.sass';

// Import components
import Grid from '../components/Grid';
import GridDrop from '../components/GridDrop';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
	font-family: Montserrat, Georgia, monospace;
	padding-top: 100px;
	padding-bottom: 100px;
    background: #fff;
    color: #212121;
	font-size: 16;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed
  }

  h1 {
	font-size: 30px;
  }

  footer {
	text-align: center;
  }
`;

// Template
export default Home => (
<div className="container">
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
				// TODO: Full validation
        		let errors = {};
        		if (!values.type) {
          			errors.type = 'Required';
        		} else if (!values.size) {
					errors.size = 'Required';
				} else if (!values.dough) {
					errors.dough = 'Required';
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
								notes: "${values.notes}"
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
    						query: { id: orderID }
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
					<div className="box">
					<GridDrop>
						<label>Pizza Type:</label>
						<div className="select">
						<Field name="type" component="select" placeholder="Pizza Type">
							<option>Select</option>
  							<option value="Margharita">Margharita</option>
  							<option value="Pepperoni">Pepperoni</option>
 							<option value="BBQ Chicken">BBQ Chicken</option>
						</Field>
						<ErrorMessage name="type" component="div" />
						</div>
						<label>Size:</label>
						<div className="select">
						<Field name="size" component="select" placeholder="Size">
							<option>Select</option>
  							<option value="Small">Small</option>
  							<option value="Medium">Medium</option>
 							<option value="Large">Large</option>
							<option value="Extra Large">Extra Large</option>
						</Field>
						<ErrorMessage name="size" component="div" />
						</div>
						<label>Dough:</label>
						<div className="select">
						<Field name="dough" component="select" placeholder="Dough" >
							<option>Select</option>
  							<option value="Thin">Thin</option>
  							<option value="Thick">Thick</option>
						</Field>
						<ErrorMessage name="dough" component="div" />
						</div>
						</GridDrop>
						<br/>
						<Grid>
						<label>Full name:</label>
						<Field className="input" type="text" name="name" placeholder="Mark Suckerberg" required/>
						<label>Phone:</label>
						<Field className="input" type="tel" name="phone" placeholder="666666666" required/>
						<label>City:</label>
						<Field className="input" type="text" name="city" placeholder="Menlo Park" required/>
						<label>Street & Apartment Number:</label>
						<Field className="input" type="text" name="street" placeholder="1 Hacker Way" required/>
						<label>Time:</label>
						<Field className="input" type="text" name="time" placeholder="12:43" required/>
						<label>Additional notes:</label>
						<Field className="input" type="text" name="notes"/>
						<button className="button is-dark" type="submit" disabled={isSubmitting}>Submit!</button>
						</Grid>
						</div>
					</Form>
			)}
		</Formik>
			<footer>
				<br/>
				<p>Powered by PizzaQL 🍕</p>
			</footer>
		<GlobalStyle/>
	</div>
);
