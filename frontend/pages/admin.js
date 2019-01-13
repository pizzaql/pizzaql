import React, {Component} from 'react';
import {createGlobalStyle} from 'styled-components';
import {Card} from '@blueprintjs/core';
import ky from 'ky';
import boolean from 'boolean';
import secureTemplate from '../static/secure-template';
import checkboxes from '../components/checkboxes';
import Check from '../components/Check';
import fonts from './fonts';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
	font-family: Montserrat, Georgia, monospace;
  	text-align: center;
  	background: #fff;
  	color: #212121;
	font-size: 16;
  	-webkit-font-smoothing: antialiased;
  	text-rendering: optimizeSpeed
  }

  h1 {
	font-size: 30px;
  }

  h2 {
    font-size: 18px;
  }

  .half-width {
	margin: auto;
	margin-bottom: 20px;
	word-wrap: break-word;
	width: 60%
  }

  .inline {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-around;
	  text-align: right
  }


  table {
    table-layout: fixed; 
    word-wrap: break-word;
    width: 100%
  }
`;

// Query to get orders from Prisma
const query = `
query {
  orders {
    id
    size
    dough
    type
    name
    phone
    time
    city
    street
  }
}`;

class Secret extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: [],
			checkedItems: new Map()
		};

		this.handleChange = this.handleChange.bind(this);
	}

	async handleChange(e) {
		const i = e.target.name;
		const c = e.target.checked;

		localStorage.setItem('item', i);
		localStorage.setItem('isChecked', c);

		await this.setState(prevState => ({checkedItems: prevState.checkedItems.set(i, boolean(c))}));
	}

	async componentDidMount() {
		const item = await localStorage.getItem('item');
		const isChecked = await localStorage.getItem('isChecked');

		await this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, boolean(isChecked))}));

		// Post query to Prisma
		const get = await ky.post('http://localhost:4466', {json: {query}}).json();
		this.setState({orders: get.data.orders});
		await fonts();
	}

	render() {
		const {orders} = this.state;

		return (
			<div className="container">
				<h1>Welcome to Admin Dashboard</h1>

				<p>✔️ You are logged in, click <a href="/logout">here</a> to logout.</p>
				<React.Fragment>
					{
						checkboxes.map(item => (
							<Check key={item.key} name={item.name} label={item.label} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange}/>
						))
					}
				</React.Fragment>
				<br/>
				<br/>
				{orders.map(el => (
					<Card className="half-width" key={el.id}>
						<h2>Order id. <strong>{el.id}</strong></h2>
						<br/>
						<table className="bp3-html-table .bp3-interactive .bp3-html-table-bordered">
							<thead>
								<tr>
									<th>Type</th>
									<th>Size</th>
									<th>Dough</th>
									<th>Name</th>
									<th>Phone</th>
									<th>City</th>
									<th>Street</th>
									<th>Time</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{el.type}</td>
									<td>{el.size}</td>
									<td>{el.dough}</td>
									<td>{el.name}</td>
									<td>{el.phone}</td>
									<td>{el.city}</td>
									<td>{el.street}</td>
									<td>{el.time}</td>
								</tr>
							</tbody>
						</table>
					</Card>
				))}
				<GlobalStyle/>
			</div>
		);
	}
}

export default secureTemplate(Secret);
