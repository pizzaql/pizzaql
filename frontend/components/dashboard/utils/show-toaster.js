import {Position, Toaster} from '@blueprintjs/core';

const showToaster = async (message, error) => {
	const AppToaster = await Toaster.create({
		position: Position.BOTTOM_RIGHT
	});

	if (error) {
		AppToaster.show({
			message: 'Something went wrong!',
			intent: 'error',
			icon: 'trash',
			timeout: 3000
		});
	}

	AppToaster.show({
		message,
		intent: 'success',
		icon: 'tick',
		timeout: 3000
	});
};

export default showToaster;
