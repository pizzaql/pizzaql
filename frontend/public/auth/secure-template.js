import React from 'react';
import Link from 'next/link';
import {Button, Card, NonIdealState, Elevation} from '@blueprintjs/core';
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
						<NonIdealState
							icon="disable"
							title="Access Denied!"
							description="You need to login to access this page!"
							action={
								<Link href="/authorize">
									<Button>Login</Button>
								</Link>
							}
						/>
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
