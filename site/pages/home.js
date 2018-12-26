import React from 'react';
import {createGlobalStyle} from 'styled-components';
import {Formik, Form, Field} from 'formik';
import ky from 'ky';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
	font-family: Montserrat, monospace;
    background: #fff;
    color: #212121;
    padding: 1em;
    line-height: 1.8em;
	font-size: 15;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed;
    word-wrap: break-word
  }
`;

// Template
export default Home => (
	<div>
		<h1>Order a Pizza!</h1>
		<Formik
			initialValues={{
				type: '',
				size: '',
				dough: '',
				name: '',
				phone: '',
				city: '',
				street: '',
				number: '',
				time: '',
				notes: ''
			}}
			onSubmit={(values, {setSubmitting}) => {
				setTimeout(async () => {
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
								number: "${values.number}"
								notes: "${values.notes}"
							}
						) {
							id
						}
					}`;

					try {
						const id = await ky.post('https://eu1.prisma.sh/antoni-kepinski-33795f/server/dev', {json: {query}}).json();
						alert(`Your order id is ${JSON.stringify(id.data.createOrder.id)}`);
					} catch (error) {
						console.log(error);
					}

					setSubmitting(false);
				}, 400);
			}}
		>
			{({isSubmitting}) => (
				<fieldset>
					<legend>Form:</legend>
					<Form>
						<p>Type:</p>
						<Field type="radio" name="type" value="Margharita"/> Margharita<br/>
						<Field type="radio" name="type" value="Pepperoni"/> Pepperoni<br/>
						<Field type="radio" name="type" value="BBQ Chicken"/> BBQ Chicken
						<p>Size:</p>
						<Field type="radio" name="size" value="Small"/> Small<br/>
						<Field type="radio" name="size" value="Medium"/> Medium<br/>
						<Field type="radio" name="size" value="Large"/> Large<br/>
						<Field type="radio" name="size" value="Extra Large"/> Extra Large
						<p>Dough:</p>
						<Field type="radio" name="dough" value="Thin"/> Thin<br/>
						<Field type="radio" name="dough" value="Thick"/> Thick<br/>
						<p>Your name:</p>
						<Field type="text" name="name" placeholder="John"/>
						<p>Phone:</p>
						<Field type="tel" name="phone" placeholder="111222333"/>
						<p>City:</p>
						<Field type="text" name="city" placeholder="Boston"/>
						<p>Street & Apartment Number:</p>
						<Field type="text" name="street" placeholder="National Street"/> <Field type="text" name="number" placeholder="12/4a"/>
						<p>Time:</p>
						<Field type="text" name="time" placeholder="12:43"/>
						<p>Additional notes:</p>
						<Field type="text" name="notes"/>
						<br/>
						<br/>
						<button type="submit" disabled={isSubmitting}>Submit</button>
					</Form>
				</fieldset>
			)}
		</Formik>
		<GlobalStyle/>
	</div>
);
