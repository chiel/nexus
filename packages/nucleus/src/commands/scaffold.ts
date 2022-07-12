import chalk from 'chalk';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import prompts from 'prompts';
import { CommandModule } from 'yargs';

import { applyTemplate, executeCommand, getPackageJson, logger } from '../utils';

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

			const templates: { name: string, dest: string }[] = [
				{ name: 'base', dest: dir },
			];

			let dependencies: Record<string, string> = {};
			let devDependencies: Record<string, string> = {};

			const next = async (): Promise<void> => {
				const template = templates.shift();
				if (!template) return;

				const manifest = await applyTemplate(template.name, template.dest);
				dependencies = { ...dependencies, ...(manifest.dependencies || {}) };
				devDependencies = { ...devDependencies, ...(manifest.devDependencies || {}) };

				await next();
			};

			console.info();
			await next();

			console.info();
			console.info('Creating', chalk.green('package.json'), 'in', chalk.green(dirName));
			await writeFile(path.join(dir, 'package.json'), JSON.stringify(pkg, null, '\t'), 'utf8');

			const deps = Object.entries(dependencies).map(dep => dep.join('@'));
			if (deps.length > 0) {
				console.info();
				console.info('Installing', chalk.green('dependencies'), '...');
				await executeCommand('pnpm', ['install', ...deps], dir);
			}

			const devDeps = Object.entries(devDependencies).map(dep => dep.join('@'));
			if (devDeps.length > 0) {
				console.info();
				console.info('Installing', chalk.green('devDependencies'), '...');
				await executeCommand('pnpm', ['install', '-D', ...devDeps], dir);
			}

			console.info('Done!');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : err as string;
			logger.error(msg);
			process.exit(1);
		}
	},
};

export default command;
