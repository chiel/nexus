import { readdir } from 'fs/promises';
import path from 'path';

export default async function getClientEntry(): Promise<string> {
	const dirs = ['src/client', 'src'];
	const next = async (): Promise<string> => {
		const dir = dirs.shift();
		if (!dir) throw new Error('Could not find client index file.');

		try {
			const files = await readdir(path.join(process.cwd(), dir));
			if (files.some(file => /^index\.(?:js|ts|tsx)$/u.test(file))) {
				return path.join(process.cwd(), dir, 'index');
			}
		} catch (err: unknown) {
			// fall-through
		}

		return await next();
	};

	return await next();
}
