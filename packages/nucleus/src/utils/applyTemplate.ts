import chalk from 'chalk';
import { access } from 'fs/promises';
import path from 'path';

import copyDirectory from './copyDirectory';

interface Manifest {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
}

export default async function applyTemplate(name: string, dest: string): Promise<Manifest> {
	const src = path.join(__dirname, 'templates', name);

	console.info('Applying template', chalk.green(name));

	let hasFiles = false;
	const files = path.join(src, 'files');
	try {
		await access(files);
		hasFiles = true;
	} catch (_err: unknown) {
		// fall-through
	}

	if (hasFiles) {
		await copyDirectory(files, dest, (file, contents) => {
			console.info('    ...copying', chalk.green(file.replace(`${files}/`, '')));
			return contents;
		});
	}

	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return require(`${src}/manifest`) as Manifest;
	} catch (_err: unknown) {
		return {};
	}
}
