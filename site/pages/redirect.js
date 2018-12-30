import React from 'react';
import Router from 'next/router';
import {parseHash} from '../static/auth0';
import {saveToken, verifyToken} from '../static/auth';

// Redirect user after login
export default class extends React.Component {
  componentDidMount () {
    parseHash((err, result) => {
      if (err) {
        console.error('Error signing in', err);
        return;
      }
      verifyToken(result.idToken).then(valid => {
        if (valid) {
          saveToken(result.idToken, result.accessToken);
          // TODO: Fix redirection issues
          Router.push('/admin');
        } else {
          Router.push('/')
        }
      });
    })
  }
  render() {
    return null;
  }
}