import {useEffect} from 'react';
import Router from 'next/router';
import {parseHash} from '../static/auth/auth0';
import {saveToken, verifyToken} from '../static/auth/auth';

// Redirect user after login
export default () => {
	useEffect(() => {
		parseHash(async (err, result) => {
			await verifyToken(result.idToken).then(valid => {
				if (valid) {
					saveToken(result.idToken, result.accessToken);
					Router.push('/admin');
				} else {
					Router.push('/');
				}
			});
			if (err) {
				console.error('Error signing in', err);
			}
		});
	}, []);

	return null;
};
