module.exports = {
	parser: '@typescript-eslint/parser',
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:jest/recommended',
		'plugin:jest-dom/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
	],
	plugins: [
		'jest',
		'jest-dom',
		'react',
	],
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	ignorePatterns: ['dist'],
	rules: {
		'accessor-pairs': 'error',
		'array-bracket-newline': ['error', 'consistent'],
		'array-bracket-spacing': ['error', 'never'],
		'array-element-newline': ['error', 'consistent'],
		'arrow-body-style': ['error', 'as-needed'],
		'arrow-parens': ['error', 'as-needed'],
		'arrow-spacing': 'error',
		'block-spacing': 'error',
		'brace-style': 'error',
		camelcase: 'error',
		'comma-dangle': ['error', 'always-multiline'],
		'comma-spacing': 'error',
		'comma-style': 'error',
		'computed-property-spacing': 'error',
		curly: ['error', 'multi-line'],
		'default-case': 'error',
		'default-case-last': 'error',
		'default-param-last': 'error',
		'dot-location': ['error', 'property'],
		'dot-notation': 'error',
		'eol-last': ['error', 'always'],
		eqeqeq: ['error', 'always'],
		'func-call-spacing': 'error',
		'func-names': ['error', 'always'],
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
		'function-call-argument-newline': ['error', 'consistent'],
		'function-paren-newline': ['error', 'consistent'],
		'generator-star-spacing': 'error',
		'grouped-accessor-pairs': ['error', 'setBeforeGet'],
		'implicit-arrow-linebreak': 'error',
		indent: ['error', 'tab'],
		'jsx-quotes': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'line-comment-position': 'error',
		'linebreak-style': 'error',
		'lines-around-comment': [
			'error', {
				beforeBlockComment: true,
				afterBlockComment: false,
				beforeLineComment: true,
				afterLineComment: false,
				allowBlockStart: true,
				allowBlockEnd: false,
				allowObjectStart: true,
				allowObjectEnd: false,
				allowArrayStart: true,
				allowArrayEnd: false,
				allowClassStart: true,
				allowClassEnd: false,
			},
		],
		'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
		'max-classes-per-file': 'error',
		'multiline-ternary': ['error', 'always-multiline'],
		'new-cap': 'error',
		'new-parens': 'error',
		'newline-per-chained-call': 'error',
		'no-array-constructor': 'error',
		'no-await-in-loop': 'error',
		'no-bitwise': 'error',
		'no-caller': 'error',
		'no-confusing-arrow': 'error',
		'no-console': ['error', { allow: ['error', 'info'] }],
		'no-constant-binary-expression': 'error',
		'no-constructor-return': 'error',
		'no-duplicate-imports': 'error',
		'no-else-return': ['error', { allowElseIf: false }],
		'no-empty-function': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-floating-decimal': 'error',
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-inline-comments': 'error',
		'no-invalid-this': 'error',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-loop-func': 'error',
		'no-mixed-operators': 'error',
		'no-multi-assign': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-wrappers': 'error',
		'no-param-reassign': 'error',
		'no-promise-executor-return': 'error',
		'no-proto': 'error',
		'no-return-assign': 'error',
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-shadow': ['error', { allow: ['err'] }],
		'no-trailing-spaces': 'error',
		'no-underscore-dangle': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unneeded-ternary': 'error',
		'no-unreachable-loop': 'error',
		'no-unused-private-class-members': 'error',
		'no-use-before-define': 'error',
		'no-useless-call': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'error',
		'no-useless-constructor': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-warning-comments': 'error',
		'no-whitespace-before-property': 'error',
		'nonblock-statement-body-position': 'error',
		'object-curly-newline': 'error',
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
		'object-shorthand': ['error', 'always'],
		'one-var': ['error', 'never'],
		'operator-linebreak': ['error', 'before'],
		'padded-blocks': ['error', 'never'],
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-destructuring': 'error',
		'prefer-exponentiation-operator': 'error',
		'prefer-numeric-literals': 'error',
		'prefer-object-has-own': 'error',
		'prefer-object-spread': 'error',
		'prefer-promise-reject-errors': 'error',
		'prefer-regex-literals': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'quote-props': ['error', 'as-needed'],
		quotes: ['error', 'single'],
		radix: ['error', 'as-needed'],
		'require-atomic-updates': 'error',
		'require-await': 'error',
		'require-unicode-regexp': 'error',
		'rest-spread-spacing': 'error',
		semi: 'error',
		'semi-spacing': 'error',
		'semi-style': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
		'space-in-parens': 'error',
		'space-infix-ops': 'error',
		'space-unary-ops': ['error', { nonwords: false, words: true }],
		'spaced-comment': ['error', 'always'],
		strict: ['error', 'never'],
		'switch-colon-spacing': 'error',
		'template-curly-spacing': 'error',
		'template-tag-spacing': 'error',
		'unicode-bom': 'error',
		'yield-star-spacing': 'error',
		yoda: ['error', 'never'],
	},

	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: [
				'plugin:@typescript-eslint/recommended',
			],
			plugins: [
				'@typescript-eslint',
			],
		},
	],
};
