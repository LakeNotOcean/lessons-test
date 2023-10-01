module.exports = {
	parserOptions: {
		sourceType: 'module',
	},
	extends: ['eslint:recommended'],
	root: true,
	env: {
		node: true,
		jest: true,
		es2023: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'no-unused-vars': ['warn'],
	},
};
