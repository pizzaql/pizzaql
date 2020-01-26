import React from 'react';
import Link from 'next/link';
import {NonIdealState, Button} from '@blueprintjs/core';

export default class Error extends React.Component {
	static getInitialProps({res, err}) {
		const statusCode = res ? res.statusCode : (err ? err.statusCode : null);
		return {statusCode};
	}

	render() {
		return (
			<NonIdealState
				icon="error"
				title="Oh snap..."
				description={this.props.statusCode ? `An error ${this.props.statusCode} occurred on server` : 'An error occurred on client'}
				action={
					<Link href="/">
						<Button>Back to the home page</Button>
					</Link>
				}
			/>
		);
	}
}
