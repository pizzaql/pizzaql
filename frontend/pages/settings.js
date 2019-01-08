import React, {Component} from 'react';
import {createGlobalStyle} from 'styled-components';
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
`;

class Secret extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
		await fonts();
	}

	render() {
		return (
			<div className="container">
				<h1>Settings</h1>

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

				<GlobalStyle/>
			</div>
		);
	}
}

const lock = () => {
	if (this.state.checkedItems.get('check-box-1') === true) {
		return true;
	}
	return false;
};

export {lock};
export default secureTemplate(Secret);
