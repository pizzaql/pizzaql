import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import fetch from 'isomorphic-unfetch';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

import '../node_modules/modern-normalize/modern-normalize.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';

if (!process.browser) {
	global.fetch = fetch;
}

const client = new ApolloClient({
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
			<Container>
				<ApolloProvider client={client}>
					<Head>
						<title>PizzaQL</title>
					</Head>
					<Component {...pageProps}/>
				</ApolloProvider>
			</Container>
		);
	}
}

export default MyApp;
