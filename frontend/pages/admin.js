import React from 'react';
import {Divider, Icon} from '@blueprintjs/core';

import secureTemplate from '../public/auth/secure-template';

import Container from '../components/dashboard/container';
import CreateOrder from '../components/dashboard/utils/create-order';
import Orders from '../components/dashboard/orders';

const Dashboard = () => (
	<Container>
		<h1 className="bp3-heading">Welcome to Dashboard!</h1>
		<br/>
		<p><Icon intent="success" icon="tick-circle" iconSize={18}/> You are logged in, click <a href="/logout">here</a> to logout.</p>
		<br/>
		<CreateOrder/>
		<Divider/>
		<br/>
		<br/>
		<Orders/>
	</Container>
);

export default secureTemplate(Dashboard);
