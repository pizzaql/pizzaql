import auth0 from 'auth0-js';
import config from '../../config';

const {clientID, domain} = config.auth0;

// Authenticate to Auth0
const webAuth = (clientID, domain) => {
	return new auth0.WebAuth({
		clientID,
		domain
	});
};

// Login
const login = () => {
	const options = {
		responseType: 'id_token',
		redirectUri: 'http://localhost:3000/redirect',
		scope: 'openid profile email'
	};

	return webAuth(clientID, domain).authorize(options);
};

const parseHash = cb => {
	return webAuth(clientID, domain).parseHash(cb);
};

const logout = () => {
	return webAuth(clientID, domain).logout({returnTo: 'http://localhost:3000'});
};

export {
	login,
	parseHash,
	logout
};
