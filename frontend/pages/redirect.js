import React from 'react';
import Router from 'next/router';
import {parseHash} from '../static/auth0';
import {saveToken, verifyToken} from '../static/auth';

// Redirect user after login
export default class extends React.Component {
	componentDidMount() {
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
				return;
			}
		});
	}

	render() {
		return null;
	}
}
