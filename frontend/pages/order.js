import React from 'react';
import Link from 'next/link';
import {Button, Card, Elevation} from '@blueprintjs/core';

import Container from '../components/form/container';

class Index extends React.Component {
	state = {
		copySuccess: ''
	};

	// Get order id from query
	static async getInitialProps({query: {id}}) {
		return {
			id
		};
	}

	copyToClipboard = () => {
		this.input.select();
		document.execCommand('copy');
		this.setState({copySuccess: 'Copied!'});
	};

	render() {
		return (
			<Container style={{textAlign: 'center'}}>
				<Card elevation={Elevation.FOUR}>
					<h1 style={{fontSize: '45px'}} className="thanks">Thank you!</h1>
					<br/>
					<p>This is your order id:</p>
					<br/>
					<div style={{width: '250px', margin: 'auto'}} className="bp3-input-group">
						{/* eslint-disable-next-line no-return-assign */}
						<input ref={input => this.input = input} className="bp3-input" value={this.props.id.replace(/"/g, '')} readOnly/>
						<Button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-clipboard" onClick={this.copyToClipboard}/>
						{this.state.copySuccess}
					</div>
					<br/>
					<h2 style={{fontSize: '25px', fontWeight: 800}}>You will receive your order in about 45 minutes</h2>
					<br/>
					<p>If you won&apos;t receive your order after this time, please call us: <strong>234 567 890</strong></p>
					<br/>
					<Link prefetch href="/">
						<Button>Order another pizza!</Button>
					</Link>
				</Card>
			</Container>
		);
	}
}

export default Index;
