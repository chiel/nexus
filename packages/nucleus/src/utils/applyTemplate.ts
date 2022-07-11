import chalk from 'chalk';
import { access } from 'fs/promises';
import path from 'path';

import copyDirectory from './copyDirectory';

export default async function applyTemplate(name: string, dest: string): Promise<void> {
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
}
