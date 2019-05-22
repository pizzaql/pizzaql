import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className}) => (
	<Label className={className}>
Pizza Type:
		<div className="bp3-select">
			<FastField name="type" component="select" placeholder="Pizza Type" required>
				<option value="">Select</option>
				<option value="Margharita">Margharita</option>
				<option value="Funghi">Funghi</option>
				<option value="Cacciatore">Cacciatore</option>
				<option value="Vesuvio">Vesuvio</option>
				<option value="Milano">Milano</option>
				<option value="Capriciosa">Capriciosa</option>
				<option value="Prosciutto">Prosciutto</option>
				<option value="Hawaiano">Hawaiano</option>
				<option value="Rimini">Rimini</option>
				<option value="Bali">Bali</option>
				<option value="Pepperoni">Pepperoni</option>
				<option value="Torino">Torino</option>
			</FastField>
		</div>
	</Label>
);

const TypeSelect = styled(Wrapper)`
    width: 11rem;
	user-select: none;
`;

TypeSelect.propTypes = {
	className: PropTypes.string
};

export default TypeSelect;
