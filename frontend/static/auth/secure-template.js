import React from 'react';
import Link from 'next/link';
import {Button, Card, Elevation} from '@blueprintjs/core';
import Container from '../../components/secure/container';
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
		if (!this.props.isLoggedIn) {
			return (
				<Container>
					<Card elevation={Elevation.FOUR}>
						<div className="bp3-non-ideal-state">
							<div className="bp3-non-ideal-state-visual">
								<span className="bp3-icon bp3-icon-disable"/>
							</div>
							<h4 className="bp3-heading">Access Denied!</h4>
							<div>You need to login to access this page!</div>
							<Link prefetch href="/authorize">
								<Button>Login</Button>
							</Link>
						</div>
					</Card>
				</Container>
			);
		}

		return (
			<div>
				<Page {...this.props}/>
			</div>
		);
	}
};
