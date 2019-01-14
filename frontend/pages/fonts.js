const FontFaceObserver = require('fontfaceobserver');

// Load fonts
const fonts = async () => {
	const link = await document.createElement('link');
	link.href = await 'https://fonts.googleapis.com/css?family=Montserrat:400';
	link.rel = await 'stylesheet';

	document.head.append(link);

	const roboto = await new FontFaceObserver('Montserrat');

	try {
		roboto.load().then(() => {
			document.documentElement.classList.add('fonts="loaded"');
		});
	} catch (error) {
		document.documentElement.classList.add('fonts="error"');
	}
};

export default fonts;
