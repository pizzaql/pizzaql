import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps({renderPage}) {
		const sheet = new ServerStyleSheet();
		const page = await renderPage(App => props => sheet.collectStyles(<App {...props}/>));
		const styleTags = sheet.getStyleElement();
		return {...page, styleTags};
	}

	render() {
		return (
			<html lang="en">
				<Head>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					<meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
					<title>PizzaQL</title>
					<meta name="description" content="Modern Order Management & Placement System"/>
					<meta name="image" content="https://i.imgur.com/wTAVqy5.jpg"/>
					<meta name="theme-color" content="#212121"/>
					<meta name="msapplication-TileColor" content="#212121"/>
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
					<link rel="icon" href="static/favicon.png"/>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@0.5.0/modern-normalize.min.css"/>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blueprintjs/icons@3.5.0/lib/css/blueprint-icons.css"/>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blueprintjs/core@3.11.0/lib/css/blueprint.css"/>
					{this.props.styleTags}
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
