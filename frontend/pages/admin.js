import React, {Component} from 'react';
import {createGlobalStyle} from 'styled-components';
import ky from 'ky';
import boolean from 'boolean';
import secureTemplate from '../static/secure-template';
import checkboxes from '../components/checkboxes';
import Checkbox from '../components/Checkbox';
import fonts from './fonts';
import './styles/styles.sass';

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
							<label key={item.key}>
								{item.label}
								<Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange}/>
							</label>
						))
					}
				</React.Fragment>
				<br/>
				<br/>
				{orders.map(el => (
					<div className="box" key={el.id}>
						<h2>Order id. <strong>{el.id}</strong></h2>
						<br/>
						<table className="table is-bordered is-striped is-narrow is-hoverable">
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
					</div>
				))}
				<GlobalStyle/>
			</div>
		);
	}
}

export default secureTemplate(Secret);
