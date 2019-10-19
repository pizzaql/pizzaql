import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props}/>)
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<html lang="en">
				<Head>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					<meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
					<meta name="description" content="Modern Order Management & Placement System"/>
					<meta name="image" content="https://i.imgur.com/wTAVqy5.jpg"/>
					<meta name="theme-color" content="#212121"/>
					<meta name="msapplication-TileColor" content="#212121"/>
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
					<link rel="manifest" href="/manifest.json"/>
					<link rel="icon" href="/favicon.png"/>
					<meta name="twitter:card" content="summary"/>
					<meta name="twitter:title" content="PizzaQL"/>
					<meta name="twitter:description" content="Modern Order Management & Placement System"/>
					<meta name="twitter:image:src" content="https://i.imgur.com/wTAVqy5.jpg"/>
					<meta name="og:title" content="PizzaQL"/>
					<meta name="og:description" content="Modern Order Management & Placement System"/>
					<meta name="og:image" content="https://i.imgur.com/wTAVqy5.jpg"/>
					<meta name="og:url" content=""/>
					<meta name="og:site_name" content="PizzaQL"/>
					<meta name="og:type" content="website"/>
					<link rel="icon" href="/favicon.png"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
