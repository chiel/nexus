import chalk from 'chalk';
import path from 'path';

import copyDirectory from './copyDirectory';

export default async function applyTemplate(name: string, dest: string): Promise<void> {
	const src = path.join(__dirname, 'templates', name);

	console.info('Apply template', chalk.green(name));

	const files = path.join(src, 'files');
	await copyDirectory(files, dest, (file, contents) => {
		console.info('    ...copying', chalk.green(file.replace(`${files}/`, '')));
		return contents;
	});
}
