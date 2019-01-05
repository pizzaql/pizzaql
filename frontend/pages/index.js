import React from 'react';
import Home from './home';
import fonts from './fonts';

// Load fonts & main page
class Index extends React.Component {
	async componentDidMount() {
		await fonts();
	}

	render() {
		return <Home/>;
	}
}

export default Index;
