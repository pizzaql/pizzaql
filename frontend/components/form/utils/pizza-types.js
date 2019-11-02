import React from 'react';

import config from '../../../config';

const {pizzas} = config;

const types = Object.keys(pizzas);

const pizzaTypes = () => types.map(type => <option value={type} key={type}>{type}</option>);

export default pizzaTypes;
