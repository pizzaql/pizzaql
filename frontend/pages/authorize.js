import {useEffect} from 'react';
import {login} from '../static/auth0';
import template from '../static/template';

// Login
const Login = () => {
	useEffect(() => {
		login();
	});

	return null;
};

export default template(Login);
