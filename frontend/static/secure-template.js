import React from 'react';
import {getTokenForBrowser, getTokenForServer} from './auth';

export default Page => class secureTemplate extends React.Component {
	static async getInitialProps({req}) {
		const loggedInUser = process.browser ? await getTokenForBrowser() : await getTokenForServer(req);
		const pageProperties = await Page.getInitialProps && await Page.getInitialProps(req);
		return {
			...pageProperties,
			loggedInUser,
			isLoggedIn: Boolean(loggedInUser)
		};
	}

	render() {
		// Check if admin is logged in
		if (!this.props.isLoggedIn) {
			return (
				<div>
					<p>You&apos;re not logged in yet, click <a href="/login">here</a> to login.</p>
				</div>
			);
		}
		return (
			<div>
				<Page {...this.props}/>
			</div>
		);
	}
};
