import path from 'path';

interface Config {
	port?: number;
}

export default function getConfig(): Config {
	try {
		return require(path.resolve(process.cwd(), '.nucleusrc.js'));
	} catch (_err: unknown) {
		return {};
	}
}
