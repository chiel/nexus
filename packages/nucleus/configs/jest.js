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
	preset: 'ts-jest',
	resetMocks: true,
	restoreMocks: true,
	rootDir: process.cwd(),
	testMatch: ['**/__tests__/*.{ts,tsx}'],
};
