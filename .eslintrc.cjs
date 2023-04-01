module.exports = {
	env: {
		browser: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	ignorePatterns: [
		'/dist',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'@typescript-eslint/explicit-member-accessibility': [
			'off',
			{
				accessibility: 'explicit',
			},
		],
		'@typescript-eslint/indent': [
			'error',
			'tab',
			{
				ObjectExpression: 'first',
				FunctionDeclaration: {
					parameters: 'first',
				},
				FunctionExpression: {
					parameters: 'first',
				},
				flatTernaryExpressions: true,
			},
		],
		'@typescript-eslint/comma-dangle': [
			'error',
			'always-multiline',
		],
		'@typescript-eslint/no-non-null-assertion': ['off'],
		'object-curly-spacing': ['error', 'always'],
		'@typescript-eslint/semi': ['error', 'always'],
		'eol-last': ['error', 'always'],
		'prefer-template': ['error'],
		'quote-props': ['error', 'as-needed'],
		quotes: ['error', 'single'],
		'no-trailing-spaces': ['error'],
		'no-console': ['warn'],
		'keyword-spacing': ['error', { before: true, after: true }],
	},
};
