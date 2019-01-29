import {useEffect} from 'react';
import Router from 'next/router';
import template from '../static/template';
import {logout} from '../static/auth0';
import {deleteToken} from '../static/auth';

// Logout
const Logout = () => {
	useEffect(() => {
		deleteToken();
		logout();
		Router.push('/');
	});

	return null;
};

export default template(Logout);

