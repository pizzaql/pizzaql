import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import fetch from 'isomorphic-unfetch';
import ApolloClient, {InMemoryCache} from 'apollo-boost';

import '../node_modules/modern-normalize/modern-normalize.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';

if (!process.browser) {
	global.fetch = fetch;
}

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache()
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
