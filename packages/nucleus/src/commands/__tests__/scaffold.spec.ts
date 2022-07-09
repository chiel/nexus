import chalk from 'chalk';
import { mkdir, writeFile } from 'fs/promises';
import prompts from 'prompts';

import { logger } from '../../utils';
import command from '../scaffold';

jest.mock('fs/promises');
jest.mock('prompts');
jest.mock('../../utils', () => ({
	logger: { error: jest.fn() },
}));

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
		jest.spyOn(process, 'cwd').mockReturnValue('/path/to');
		jest.spyOn(process, 'exit').mockImplementation();

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

	it('should should create a directory with a package.json for scoped packages', async () => {
		await handler(defaultArgs);

		const pkg = JSON.stringify({
			publishConfig: {
				access: 'private',
				directory: 'dist',
			},
			name: '@chiel/whatever',
			version: '0.0.0',
			repository: 'git@github.com:chiel/whatever.git',
		}, null, '  ');

		expect(mkdir).toHaveBeenCalledWith('/path/to/whatever');
		expect(writeFile).toHaveBeenCalledWith('/path/to/whatever/package.json', pkg, 'utf8');
		expect(console.info).toHaveBeenCalledTimes(4);
		expect(console.info).toHaveBeenCalledWith('Creating directory', chalk.green('whatever'));
		expect(console.info).toHaveBeenCalledWith('Creating', chalk.green('package.json'), 'in', chalk.green('whatever'));
		expect(console.info).toHaveBeenCalledWith('Done!');
	});

	it('should should create a directory with a package.json for unscoped packages', async () => {
		(prompts as unknown as jest.Mock).mockResolvedValue({ ...defaultAnswers, name: 'beepboop' });

		await handler(defaultArgs);

		const pkg = JSON.stringify({
			publishConfig: {
				access: 'private',
				directory: 'dist',
			},
			name: 'beepboop',
			version: '0.0.0',
			repository: 'git@github.com:chiel/whatever.git',
		}, null, '  ');

		expect(mkdir).toHaveBeenCalledWith('/path/to/beepboop');
		expect(writeFile).toHaveBeenCalledWith('/path/to/beepboop/package.json', pkg, 'utf8');
		expect(console.info).toHaveBeenCalledTimes(4);
		expect(console.info).toHaveBeenCalledWith('Creating directory', chalk.green('beepboop'));
		expect(console.info).toHaveBeenCalledWith('Creating', chalk.green('package.json'), 'in', chalk.green('beepboop'));
		expect(console.info).toHaveBeenCalledWith('Done!');
	});

	it('should change the package.json repository field for monorepo packages', async () => {
		(prompts as unknown as jest.Mock).mockResolvedValue({ ...defaultAnswers, monorepo: true });

		await handler(defaultArgs);

		const pkg = JSON.stringify({
			publishConfig: {
				access: 'private',
				directory: 'dist',
			},
			name: '@chiel/whatever',
			version: '0.0.0',
			repository: {
				type: 'git',
				url: 'git@github.com:chiel/whatever.git',
				directory: 'packages/whatever',
			},
		}, null, '  ');

		expect(writeFile).toHaveBeenCalledWith('/path/to/whatever/package.json', pkg, 'utf8');
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
