import { ESLint } from 'eslint';
import path from 'path';

import { fileExists } from '../../utils';
import command from '../lint';

jest.mock('eslint');
jest.mock('../../utils', () => ({
	fileExists: jest.fn(),
}));

describe('command', () => {
	it('should properly configure the command', () => {
		expect(command).toEqual({
			command: 'lint',
			describe: 'Lint code',
			builder: {
				fix: {
					boolean: true,
					default: false,
				},
			},
			handler: expect.any(Function),
		});
	});
});

describe('handler', () => {
	let formatter: { format: jest.Mock };
	let lintFiles: jest.Mock;
	let loadFormatter: jest.Mock;
	let outputFixes: jest.Mock;

	const { handler } = command;

	const defaultArgs = { _: [], $0: '', fix: false };

	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation();
		jest.spyOn(console, 'info').mockImplementation();
		jest.spyOn(process, 'cwd').mockReturnValue('/path/to');

		formatter = { format: jest.fn() };
		lintFiles = jest.fn();
		loadFormatter = jest.fn();
		outputFixes = jest.fn();

		ESLint.outputFixes = outputFixes;
		(ESLint as unknown as jest.Mock).mockReturnValue({ lintFiles, loadFormatter });
	});

	it('should run eslint with the project\'s eslint config', async () => {
		(fileExists as jest.Mock).mockResolvedValue(true);
		lintFiles.mockResolvedValue('results');
		loadFormatter.mockResolvedValue(formatter);
		formatter.format.mockReturnValue('result-text');

		await handler(defaultArgs);
		expect(fileExists).toHaveBeenCalledWith('/path/to/.eslintrc.js');
		expect(ESLint).toHaveBeenCalledWith({
			fix: false,
			overrideConfigFile: undefined,
			useEslintrc: true,
		});
		expect(lintFiles).toHaveBeenCalledWith('.');
		expect(outputFixes).not.toHaveBeenCalled();
		expect(loadFormatter).toHaveBeenCalledWith('stylish');
		expect(formatter.format).toHaveBeenCalledWith('results');
		expect(console.info).toHaveBeenCalledWith('result-text');
	});

	it('should output fixes if run with --fix', async () => {
		(fileExists as jest.Mock).mockResolvedValue(true);
		lintFiles.mockResolvedValue('results');

		await handler({ ...defaultArgs, fix: true });
		expect(ESLint).toHaveBeenCalledWith(expect.objectContaining({ fix: true }));
		expect(outputFixes).toHaveBeenCalledWith('results');
	});

	it('should run eslint with the default config if the project does not have one', async () => {
		(fileExists as jest.Mock).mockResolvedValue(false);

		await handler(defaultArgs);
		const dirname = path.resolve(__dirname, '..');
		expect(ESLint).toHaveBeenCalledWith({
			fix: false,
			overrideConfigFile: `${dirname}/configs/eslint.js`,
			useEslintrc: false,
		});
	});

	it('should print an error message if something goes wrong', async () => {
		const err = new Error('Uh-oh!');
		(fileExists as jest.Mock).mockResolvedValue(true);
		lintFiles.mockRejectedValue(err);

		await handler(defaultArgs);
		expect(console.error).toHaveBeenCalledWith(err);
	});
});
