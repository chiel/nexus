import chalk from 'chalk';
import { mkdir, writeFile } from 'fs/promises';
import prompts from 'prompts';

import { applyTemplate, executeCommand, getPackageJson, logger } from '../../utils';
import command from '../scaffold';

jest.mock('fs/promises');
jest.mock('prompts');
jest.mock('../../utils');

describe('command', () => {
	it('should properly configure the command', () => {
		expect(command).toEqual({
			command: 'scaffold',
			describe: 'Scaffold a new package',
			handler: expect.any(Function),
		});
	});
});

describe('handler', () => {
	const { handler } = command;
	const defaultArgs = { _: [], $0: '' };
	const defaultAnswers = {
		name: '@chiel/whatever',
		repository: 'git@github.com:chiel/whatever.git',
		monorepo: false,
	};

	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation();
		jest.spyOn(console, 'info').mockImplementation();
		jest.spyOn(logger, 'error').mockImplementation();
		jest.spyOn(process, 'cwd').mockReturnValue('/path/to');
		jest.spyOn(process, 'exit').mockImplementation();

		(applyTemplate as jest.Mock).mockReturnValue({});
		(executeCommand as jest.Mock).mockResolvedValue(undefined);
		(getPackageJson as jest.Mock).mockReturnValue({ name: '@chiel/whatever' });
		(mkdir as jest.Mock).mockImplementation();
		(writeFile as jest.Mock).mockImplementation();

		(prompts as unknown as jest.Mock).mockResolvedValue(defaultAnswers);
	});

	it('should ask some questions about what kind of package to create', async () => {
		await handler(defaultArgs);
		expect(prompts).toHaveBeenCalledWith([
			{ type: 'text', name: 'name', message: 'Package name' },
			{ type: 'text', name: 'repository', message: 'Repository' },
			{ type: 'toggle', name: 'monorepo', message: 'Is this package part of a monorepo?', initial: true, active: 'yes', inactive: 'no' },
		]);
	});

	it('should always apply the base and client template', async () => {
		await handler(defaultArgs);

		expect(applyTemplate).toHaveBeenCalledWith('base', '/path/to/whatever');
		expect(applyTemplate).toHaveBeenCalledWith('client', '/path/to/whatever/src');
	});

	it('should install any dependencies that have been defined in applied templates', async () => {
		(applyTemplate as jest.Mock).mockReturnValue({
			dependencies: { react: 'latest', 'react-dom': 'latest' },
		});

		await handler(defaultArgs);

		expect(executeCommand).toHaveBeenCalledWith(
			'pnpm',
			['install', 'react@latest', 'react-dom@latest'],
			'/path/to/whatever',
		);
	});

	it('should install any devDependencies that have been defined in applied templates', async () => {
		(applyTemplate as jest.Mock).mockReturnValue({
			devDependencies: { '@types/react': 'latest', '@types/react-dom': 'latest' },
		});

		await handler(defaultArgs);

		expect(executeCommand).toHaveBeenCalledWith(
			'pnpm',
			['install', '-D', '@types/react@latest', '@types/react-dom@latest'],
			'/path/to/whatever',
		);
	});

	it('should should create a directory with a package.json for scoped packages', async () => {
		await handler(defaultArgs);

		expect(mkdir).toHaveBeenCalledWith('/path/to/whatever');

		expect(writeFile).toHaveBeenCalledWith(
			'/path/to/whatever/package.json',
			JSON.stringify({ name: '@chiel/whatever' }, null, '\t'),
			'utf8',
		);

		expect(console.info).toHaveBeenCalledWith('Creating directory', chalk.green('whatever'));
		expect(console.info).toHaveBeenCalledWith('Creating', chalk.green('package.json'), 'in', chalk.green('whatever'));
		expect(console.info).toHaveBeenCalledWith('Done!');
	});

	it('should should create a directory with a package.json for unscoped packages', async () => {
		(getPackageJson as jest.Mock).mockReturnValue({ name: 'whatever' });
		await handler(defaultArgs);

		expect(mkdir).toHaveBeenCalledWith('/path/to/whatever');

		expect(writeFile).toHaveBeenCalledWith(
			'/path/to/whatever/package.json',
			JSON.stringify({ name: 'whatever' }, null, '\t'),
			'utf8',
		);

		expect(console.info).toHaveBeenCalledWith('Creating directory', chalk.green('whatever'));
		expect(console.info).toHaveBeenCalledWith('Creating', chalk.green('package.json'), 'in', chalk.green('whatever'));
		expect(console.info).toHaveBeenCalledWith('Done!');
	});

	it('should log an error and exit if a proper error happens', async () => {
		(prompts as unknown as jest.Mock).mockRejectedValue(new Error('Oh no!'));
		await handler(defaultArgs);
		expect(logger.error).toHaveBeenCalledWith('Oh no!');
		expect(process.exit).toHaveBeenCalledWith(1);
	});

	it('should log an error and exit if an unknown error happens', async () => {
		(prompts as unknown as jest.Mock).mockRejectedValue('Something unexpected happened');
		await handler(defaultArgs);
		expect(logger.error).toHaveBeenCalledWith('Something unexpected happened');
		expect(process.exit).toHaveBeenCalledWith(1);
	});
});
