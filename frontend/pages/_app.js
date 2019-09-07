import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import fetch from 'node-fetch';

import 'modern-normalize/modern-normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

if (!process.browser) {
	global.fetch = fetch;
}

const client = new ApolloClient({
	uri: 'http://localhost:4000'
});

class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;

		return (
			<>
				<ApolloProvider client={client}>
					<Head>
						<title>PizzaQL</title>
					</Head>
					<Component {...pageProps}/>
				</ApolloProvider>
			</>
		);
	}
}

export default MyApp;
