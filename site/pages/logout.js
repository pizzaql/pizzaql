import React from 'react';
import { logout } from '../static/auth0';
import { deleteToken } from '../static/auth';
import Router from 'next/router';

// Logout
export default class extends React.Component {
  componentDidMount () {
    deleteToken();
    logout();
    Router.push('/');
  }
  render() {
    return null;
  }
}