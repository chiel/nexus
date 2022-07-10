import chalk from 'chalk';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import prompts from 'prompts';
import { CommandModule } from 'yargs';

import { getPackageJson, logger } from '../utils';

const command: CommandModule = {
	command: 'scaffold',
	describe: 'Scaffold a new package',
	async handler() {
		try {
			const answers = await prompts([
				{
					type: 'text',
					name: 'name',
					message: 'Package name',
				},
				{
					type: 'text',
					name: 'repository',
					message: 'Repository',
				},
				{
					type: 'toggle',
					name: 'monorepo',
					message: 'Is this package part of a monorepo?',
					initial: true,
					active: 'yes',
					inactive: 'no',
				},
			]);

			const dirName = answers.name.replace(/^[^/]+\//u, '');
			const dir = path.join(process.cwd(), dirName);

			console.info();
			console.info('Creating directory', chalk.green(dirName));
			await mkdir(dir);

			const pkg = getPackageJson({
				monorepo: answers.monorepo,
				name: answers.name,
				repository: answers.repository,
			});

			console.info('Creating', chalk.green('package.json'), 'in', chalk.green(dirName));
			await writeFile(path.join(dir, 'package.json'), JSON.stringify(pkg, null, '\t'), 'utf8');

			console.info('Done!');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : err as string;
			logger.error(msg);
			process.exit(1);
		}
	},
};

export default command;
