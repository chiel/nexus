const path = require('path');

module.exports = {
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	globals: {
		'ts-jest': {
			tsconfig: path.join(__dirname, 'tsconfig.jest.json'),
		},
	},
	modulePathIgnorePatterns: ['<rootDir>/dist'],
	preset: 'ts-jest',
	resetMocks: true,
	restoreMocks: true,
	rootDir: process.cwd(),
	setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.ts')],
	testEnvironment: 'jsdom',
	testMatch: ['**/__tests__/*.{ts,tsx}'],
	transformIgnorePatterns: ['/node_modules/(?!@chiel/nucleus/configs)/.*'],
};
