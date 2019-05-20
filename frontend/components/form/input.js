import React from 'react';
import styled from 'styled-components';
import {ErrorMessage, FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className, label, type, name, placeholder, required}) => (
	<Label className={className}>
		{label}
		<FastField className="bp3-input" type={type} name={name} placeholder={placeholder} required={required}/>
		<ErrorMessage name={name} component="div"/>
	</Label>
);

const Input = styled(Wrapper)`
    .bp3-input {
        width: 100%;
    }
`;

Input.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool.isRequired
};

export default Input;
