import getConfig from '../getConfig';

describe('getConfig', () => {
	beforeEach(() => {
		jest.spyOn(process, 'cwd').mockReturnValue('/path/to');
	});

	it('should return an empty object if no config file is found', () => {
		const config = getConfig();
		expect(config).toEqual({});
	});

	it('should return the config if a config file is found', () => {
		jest.mock(
			'/path/to/.nucleusrc.js',
			() => ({ port: 1234 }),
			{ virtual: true },
		);
		const config = getConfig();
		expect(config).toEqual({ port: 1234 });
	});
});
