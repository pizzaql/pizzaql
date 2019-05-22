import React from 'react';
import styled from 'styled-components';
import {Button} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className, loading, disabled}) => (
	<div className={className}>
		<Button
			type="submit"
			loading={loading}
			disabled={disabled}
		>
Submit!
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
	loading: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired
};

export default Submit;
