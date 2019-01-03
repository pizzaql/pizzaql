import auth0 from 'auth0-js';
import * as settings from '../settings';

const clientID = settings.clientID;
const domain = settings.domain;

// Authenticate to Auth0
function webAuth(clientID, domain) {
  return new auth0.WebAuth({
    clientID: clientID,
    domain: domain
  });
}

// Login
function login() {
  const options = {
    responseType: 'id_token',
    redirectUri: 'http://localhost:3000/redirect',
    scope: 'openid profile email'
  };
  
  return webAuth(clientID, domain).authorize(options);
}

function parseHash(cb) {
  return webAuth(clientID, domain).parseHash(cb);
}

function logout() {
  return webAuth(clientID, domain).logout();
}

export {
  login,
  parseHash,
  logout
};