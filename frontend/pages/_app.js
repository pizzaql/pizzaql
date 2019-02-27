import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import withApolloClient from '../lib/with-apollo-client';

import '../node_modules/modern-normalize/modern-normalize.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';

class MyApp extends App {
	static async getInitialProps({Component, ctx}) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return {pageProps};
	}

	render() {
		const {Component, pageProps, apolloClient} = this.props;
		return (
			<Container>
				<ApolloProvider client={apolloClient}>
					<Head>
						<title>PizzaQL</title>
					</Head>
					<Component {...pageProps}/>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withApolloClient(MyApp);
