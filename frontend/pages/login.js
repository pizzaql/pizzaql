import React from 'react';
import {login} from '../static/auth0';
import template from '../static/template';

// Login
class Login extends React.Component {
	componentDidMount() {
		login();
	}

	render() {
		return null;
	}
}

export default template(Login);
