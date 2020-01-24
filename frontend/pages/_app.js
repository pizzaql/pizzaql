import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import {createGlobalStyle} from 'styled-components';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import fetch from 'node-fetch';

import MontserratWoff from '../public/fonts/montserrat-v12-latin-ext-regular.woff';
import MontserratWoff2 from '../public/fonts/montserrat-v12-latin-ext-regular.woff2';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

if (!process.browser) {
	global.fetch = fetch;
}

const client = new ApolloClient({
	uri: 'http://localhost:4000'
});

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-display: fallback;
		src: local('Montserrat Regular'), local('Montserrat-Regular'),
			url(${MontserratWoff2}) format('woff2'),
			url(${MontserratWoff}) format('woff');
  	}

	body {
		font-family: Montserrat, Georgia, monospace;
		background: #394b59;
		word-wrap: break-word;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeSpeed;
	}
`;

class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;

		return (
			<ApolloProvider client={client}>
				<Head>
					<title>PizzaQL</title>
				</Head>
				<Component {...pageProps}/>
				<GlobalStyle/>
			</ApolloProvider>
		);
	}
}

export default MyApp;
