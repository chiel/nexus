import chalk from 'chalk';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import prompts from 'prompts';
import { CommandModule } from 'yargs';

import { logger } from '../utils';

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
			]);

			const dirName = answers.name.replace(/^[^/]+\//u, '');
			const dir = path.join(process.cwd(), dirName);

			console.info();
			console.info('Creating directory', chalk.green(dirName));
			await mkdir(dir);

			const pkg = {
				name: answers.name,
				version: '0.0.0',
			};

			console.info('Creating', chalk.green('package.json'), 'in', chalk.green(dirName));
			await writeFile(path.join(dir, 'package.json'), JSON.stringify(pkg, null, '  '), 'utf8');

			console.info('Done!');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : err as string;
			logger.error(msg);
			process.exit(1);
		}
	},
};

export default command;
