const presets = [
	['@babel/preset-env', {
		targets: {
			esmodules: true
		}
	}],
	['next/babel']
];

const plugins = [
	['babel-plugin-styled-components', {
		ssr: true,
		pure: true
	}]
];

module.exports = {presets, plugins};
