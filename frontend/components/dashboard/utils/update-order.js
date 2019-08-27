import React from 'react';
import {Button} from '@blueprintjs/core';
import {useMutation} from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import {CHANGE_ORDER_STATUS} from '../../api';
import showToaster from './show-toaster';

const UpdateOrder = ({icon, intent, disabled, key, id, status}) => {
	const [updateOrder, {loading, error}] = useMutation(CHANGE_ORDER_STATUS);

	return (
		<>
			<Button
				style={{margin: '5px'}}
				icon={icon}
				intent={intent}
				loading={loading}
				disabled={disabled}
				key={key}
				data-order-id={id}
				onClick={e => {
					const orderID = e.currentTarget.attributes['data-order-id'].value;

					updateOrder({variables: {status, id: orderID}});
					showToaster('Status changed!', error);
				}}
			>
      Complete
			</Button>
			{error && <p>Error :( Please try again</p>}
		</>
	);
};

UpdateOrder.propTypes = {
	icon: PropTypes.string.isRequired,
	intent: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	key: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired
};

export default UpdateOrder;
