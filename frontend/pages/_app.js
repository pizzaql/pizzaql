import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

import 'modern-normalize/modern-normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

if (!process.browser) {
	global.fetch = fetch;
}

const client = new ApolloClient({
	ssrMode: true,
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http://localhost:4000'
	}),
	freezeResults: true,
	assumeImmutableResults: true
});

class MyApp extends App {
	static async getInitialProps({Component, ctx}) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return {pageProps};
	}

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
