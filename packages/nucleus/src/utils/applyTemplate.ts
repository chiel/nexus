import chalk from 'chalk';
import path from 'path';

import copyDirectory from './copyDirectory';

export default async function applyTemplate(name: string, dest: string): Promise<void> {
	const src = path.join(__dirname, 'templates', name);

	await copyDirectory(path.join(src, 'files'), dest, (file, contents) => {
		console.info('    ...copying', chalk.green(file.replace(`${src}/`, '')));
		return contents;
	});
}
