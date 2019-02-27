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
		ssr: true,
		minify: true,
		pure: true
	}],
	['@babel/plugin-proposal-class-properties']
];

module.exports = {presets, plugins};
