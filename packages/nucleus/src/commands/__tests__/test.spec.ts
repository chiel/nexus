// eslint-disable-next-line jest/no-jest-import
import { run } from 'jest';
import path from 'path';

import { fileExists } from '../../utils';
import command from '../test';

jest.mock('jest', () => ({
	run: jest.fn(),
}));
jest.mock('../../utils', () => ({
	fileExists: jest.fn(),
}));

describe('command', () => {
	it('should properly configure the command', () => {
		expect(command).toEqual({
			command: 'test',
			describe: 'Run tests',
			handler: expect.any(Function),
		});
	});
});

describe('handler', () => {
	const { handler } = command;

	const defaultArgs = { _: [], $0: '', coverage: false, watch: false };

	beforeEach(() => {
		jest.spyOn(process, 'cwd').mockReturnValue('/path/to');
	});

	it('should run jest with the project\'s jest config', async () => {
		(fileExists as jest.Mock).mockResolvedValue(true);

		await handler(defaultArgs);
		expect(fileExists).toHaveBeenCalledWith('/path/to/jest.config.js');
		expect(run).toHaveBeenCalledWith(['-c', '/path/to/jest.config.js']);
	});

	it('should run jest with the default config if the project does not have one', async () => {
		(fileExists as jest.Mock).mockResolvedValue(false);

		await handler(defaultArgs);
		const dirname = path.resolve(__dirname, '..');
		expect(run).toHaveBeenCalledWith(['-c', `${dirname}/configs/jest.js`]);
	});

	it('should pass any extra args straight to jest', async () => {
		(fileExists as jest.Mock).mockResolvedValue(true);

		await handler({ ...defaultArgs, _: ['test', '--whatever'] });
		expect(run).toHaveBeenCalledWith(['-c', '/path/to/jest.config.js', '--whatever']);
	});
});
