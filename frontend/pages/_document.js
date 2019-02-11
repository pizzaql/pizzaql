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
					{/* Temporary workaround, since importing blueprint icons with Next.js throws an error */}
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@blueprintjs/icons@3.6.0/lib/css/blueprint-icons.css"/>
					{/* eslint-disable react/no-danger */}
					<style dangerouslySetInnerHTML={{__html: `
						@font-face {
							font-family: 'Montserrat';
							font-style: normal;
							font-weight: 400;
							font-display: swap;
							src: local('Montserrat Regular'), local('Montserrat-Regular'),
								url('static/fonts/montserrat-v12-latin-ext-regular.woff2') format('woff2'),
								url('static/fonts/montserrat-v12-latin-ext-regular.woff') format('woff');
							}
						}
						}
					`}}/>
					{/* eslint-enable react/no-danger */}
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
