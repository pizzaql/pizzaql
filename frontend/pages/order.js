import React from 'react';
import {createGlobalStyle} from 'styled-components';
import Clipboard from 'react-clipboard.js';
import fonts from './fonts';

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

  .centerify {
	  width: 250px;
      margin: auto
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
				<div className="bp3-input-group centerify">
					<input className="bp3-input" value={this.props.id.replace(/"/g, '')} readOnly/>
					<Clipboard className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-clipboard" data-clipboard-text={this.props.id.replace(/"/g, '')}/>
				</div>
				<br/>
				<h2>You will receive your order in about 45 minutes</h2>
				<br/>
				<br/>
				<p>If you won&apos;t receive your order after this time, please call us: <strong>234 567 890</strong></p>
				<GlobalStyle/>
			</div>
		);
	}
}

export default Index;
