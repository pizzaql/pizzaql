import React from 'react';
import Home from './home';
import Fonts from './fonts';

// Load fonts & main page
class Index extends React.Component {
	async componentDidMount() {
		await Fonts();
	}

	render() {
		return <Home />;
	}
}

export default Index;
