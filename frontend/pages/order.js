import React from 'react';
import {createGlobalStyle} from 'styled-components';
import Clipboard from 'react-clipboard.js';
import Countdown from 'react-countdown-now';
import fonts from './fonts';
import './styles/styles.sass';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
	font-family: Montserrat, Georgia, monospace;
    text-align: center;
    background: #fff;
    color: #212121;
	font-size: 16;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed
  }

  .field {
      width: 220px;
      margin: auto
  }

  .button {
      margin: auto;
  }


  h1 {
	font-size: 45px;
  }

  h2 {
    user-select: none;
	font-size: 30px;
    font-weight: 800
  }
`;

const Completionist = () => <span>Your order should already arrived. If not, see instructions below.</span>;

const renderer = ({minutes, seconds, completed}) => {
	if (completed) {
		// Render a completed state
		return <Completionist/>;
	}
	// Render a countdown
	return <span>{minutes}:{seconds}</span>;
};

class Index extends React.Component {
	// Get order id from query
	static async getInitialProps({query: {id}}) {
		return {
			id
		};
	}

	async componentDidMount() {
		await fonts();
	}

	render() {
		if (this.props.id === '' || this.props.id === '""') {
			return (
				<p>Order not found!</p>
			);
		}
		return (
			<div className="container">
				<h1>Thank you!</h1>
				<br/>
				<br/>
				<p>This is your order id:</p>
				<br/>
				<div className="field has-addons">
					<div className="control">
						<input className="input is-small" type="text" value={this.props.id.replace(/"/g, '')} readOnly/>
					</div>
					<Clipboard className="button is-small" data-clipboard-text={this.props.id.replace(/"/g, '')}>
						<img src="static/clippy.svg" width="15" height="15" alt="Copy to clipboard"/>
					</Clipboard>
				</div>
				<br/>
				<h2>
					<Countdown
						date={Date.now() + 2700000}
						renderer={renderer}
					/>
				</h2>
				<br/>
				<p>If you won&apos;t receive your order after this time, please call us: <strong>234 567 890</strong></p>
				<GlobalStyle/>
			</div>
		);
	}
}

export default Index;
