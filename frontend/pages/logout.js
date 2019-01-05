import React from 'react';
import Router from 'next/router';
import {logout} from '../static/auth0';
import {deleteToken} from '../static/auth';

// Logout
export default class extends React.Component {
	componentDidMount() {
		deleteToken();
		logout();
		Router.push('/');
	}

	render() {
		return null;
	}
}
