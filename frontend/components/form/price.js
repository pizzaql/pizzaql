import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
`;

const Amount = styled.p`
    font-weight: bold;
`;

const Price = ({amount}) => (
	<Wrapper>
		<Amount>{amount}</Amount>
	</Wrapper>
);

Price.propTypes = {
	amount: PropTypes.string.isRequired
};

export default Price;

