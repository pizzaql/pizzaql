import {useEffect} from 'react';
import Router from 'next/router';
import template from '../public/auth/template';
import {logout} from '../public/auth/auth0';
import {deleteToken} from '../public/auth/auth';

// Logout
const Logout = () => {
	useEffect(() => {
		deleteToken();
		logout();
		Router.push('/');
	}, []);

	return null;
};

export default template(Logout);

