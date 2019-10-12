import {useEffect} from 'react';
import {login} from '../public/auth/auth0';
import template from '../public/auth/template';

// Login
const Login = () => {
	useEffect(() => {
		login();
	}, []);

	return null;
};

export default template(Login);
