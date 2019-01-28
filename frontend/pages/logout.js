import {useEffect} from 'react';
import Router from 'next/router';
import {logout} from '../static/auth0';
import {deleteToken} from '../static/auth';

// Logout
(() => {
	useEffect(() => {
		deleteToken();
		logout();
		Router.push('/');
	});

	return null;
})();
