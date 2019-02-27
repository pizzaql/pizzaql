const presets = [
	['@babel/preset-env', {
		targets: {
			esmodules: true
		},
		useBuiltIns: 'usage'
	}],
	['next/babel']
];

const plugins = [
	['babel-plugin-styled-components', {
		minify: true,
		pure: true,
		ssr: true
	}],
	['@babel/plugin-proposal-class-properties']
];

module.exports = {presets, plugins};
