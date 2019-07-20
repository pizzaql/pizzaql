const presets = [
	['next/babel', {
		'preset-env': {
			targets: {
				esmodules: true
			},
			corejs: 3,
			useBuiltIns: 'usage'
		}
	}]
];

const plugins = [
	['babel-plugin-styled-components', {
		ssr: true,
		pure: true
	}]
];

module.exports = {presets, plugins};
