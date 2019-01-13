import React from 'react';
import {Checkbox} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Check = ({name, label, checked = false, onChange}) => (
	<Checkbox name={name} label={label} checked={checked} onChange={onChange}/>
);

Check.defaultProps = {
	checked: false
};

Check.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired
};

export default Check;
