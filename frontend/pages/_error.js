import React from 'react';
import Link from 'next/link';
import {Button} from '@blueprintjs/core';

export default class Error extends React.Component {
	static getInitialProps({res, err}) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;
		return {statusCode};
	}

	render() {
		return (
			<div className="bp3-non-ideal-state">
				<div className="bp3-non-ideal-state-visual">
					<span className="bp3-icon bp3-icon-error"/>
				</div>
				<h4 className="bp3-heading">Oh snap...</h4>
				<p>
					{this.props.statusCode ?
						`An error ${this.props.statusCode} occurred on server` :
						'An error occurred on client'}
				</p>
				<Link prefetch href="/">
					<Button>Back to the home page</Button>
				</Link>
			</div>
		);
	}
}
