import getPackageJson from '../getPackageJson';

describe('getPackageJson', () => {
	it('should return the most basic package for an unscoped package', () => {
		const monorepo = false;
		const name = 'whatever';
		const repository = 'git@github.com:chiel/whatever.git';
		const result = getPackageJson({ monorepo, name, repository });

		expect(result).toEqual({
			publishConfig: {
				access: 'private',
				directory: 'dist',
			},
			name: 'whatever',
			version: '0.0.0',
			repository: 'git@github.com:chiel/whatever.git',
			scripts: {
				lint: 'nucleus lint',
				start: 'nucleus start',
				test: 'nucleus test',
			},
		});
	});

	it('should return the most basic package for a scoped package', () => {
		const monorepo = false;
		const name = '@chiel/whatever';
		const repository = 'git@github.com:chiel/whatever.git';
		const result = getPackageJson({ monorepo, name, repository });

		expect(result).toEqual({
			publishConfig: {
				access: 'private',
				directory: 'dist',
			},
			name: '@chiel/whatever',
			version: '0.0.0',
			repository: 'git@github.com:chiel/whatever.git',
			scripts: {
				lint: 'nucleus lint',
				start: 'nucleus start',
				test: 'nucleus test',
			},
		});
	});

	it('should correctly set the repository for a monorepo package', () => {
		const monorepo = true;
		const name = '@chiel/whatever';
		const repository = 'git@github.com:chiel/whatever.git';
		const result = getPackageJson({ monorepo, name, repository });

		expect(result.repository).toEqual({
			type: 'git',
			url: 'git@github.com:chiel/whatever.git',
			directory: 'packages/whatever',
		});
	});
});
