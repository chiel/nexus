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
			builder: {
				coverage: {
					boolean: true,
					default: false,
					description: 'Collect coverage',
				},
				watch: {
					alias: 'w',
					boolean: true,
					default: false,
					description: 'Run tests in watch mode',
				},
			},
			handler: expect.any(Function),
		});
	});
});

describe('handler', () => {
	const { handler } = command;

	const defaultArgs = { '_': [], $0: '', coverage: false, watch: false };

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
		expect(run).toHaveBeenCalledWith(['-c', `${dirname}/configs/jest.config.js`]);
	});

	it('should run jest with coverage if the relevant flag is provided', async () => {
		(fileExists as jest.Mock).mockResolvedValue(true);

		await handler({ ...defaultArgs, coverage: true });
		expect(run).toHaveBeenCalledWith(['-c', '/path/to/jest.config.js', '--coverage']);
	});

	it('should run jest in watch mode if the relevant flag is provided', async () => {
		(fileExists as jest.Mock).mockResolvedValue(true);

		await handler({ ...defaultArgs, watch: true });
		expect(run).toHaveBeenCalledWith(['-c', '/path/to/jest.config.js', '--watch']);
	});
});
