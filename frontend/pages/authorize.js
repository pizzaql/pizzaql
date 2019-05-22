import {useEffect} from 'react';
import {login} from '../static/auth/auth0';
import template from '../static/auth/template';

// Login
const Login = () => {
	useEffect(() => {
		login();
	}, []);

	return null;
};

export default template(Login);
