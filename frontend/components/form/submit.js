import React from 'react';
import styled from 'styled-components';
import {Button} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className, type, text, loading}) => (
	<div className={className}>
		<Button
			type={type}
			loading={loading}
		>
			{text}
		</Button>
	</div>
);

const Submit = styled(Wrapper)`
    .bp3-button {
        width: 100%;
		user-select: none;
    }
`;

Submit.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired
};

export default Submit;
