import React from 'react';
import {createGlobalStyle} from 'styled-components';
import Fonts from './fonts';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
	font-family: Montserrat, Georgia, monospace;
    background: #fff;
    color: #212121;
	font-size: 16;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeSpeed
  }

  h1 {
	font-size: 30px;
  }
`;

class Index extends React.Component {
    // Get order id from query
    static async getInitialProps({query: { id }}) {
        return {
            id: id
        }
    }

	async componentDidMount() {
		await Fonts();
	}

	render() {
        const props = { 
            data: {
               'id': this.props.id 
            }
        }

        // TODO: More specific check
        if (this.props.id === '' || this.props.id === '""') {
            return (
                <p>Order not found!</p>
            );
        } else {
		    return (
                <div className="container">
                    <h1>Thanks for your order!</h1>
                    <p>Your order id is {this.props.id}</p>
                    <GlobalStyle/>
                </div>
            );
        }
	}
}

export default Index;
