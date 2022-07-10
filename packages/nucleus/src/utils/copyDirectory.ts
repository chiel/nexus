import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import path from 'path';

type FileProcessor = (file: string, contents: string) => Promise<string> | string;

export default async function copyDirectory(src: string, dest: string, fileProcessor?: FileProcessor) {
	await mkdir(dest, { recursive: true });

	const fileNames = await readdir(src);
	const files: {
		destPath: string;
		fileName: string;
		isDir: boolean;
		srcPath: string;
	}[] = await Promise.all(
		fileNames.map(async fileName => {
			const srcPath = path.join(src, fileName);
			const destPath = path.join(dest, fileName.replace(/_$/u, ''));
			const isDir = (await stat(srcPath)).isDirectory();
			return { destPath, fileName, isDir, srcPath };
		}),
	).then(f => f.sort((a, b) => (
		a.isDir && !b.isDir
			? 1
			: !a.isDir && b.isDir
				? -1
				: a.fileName.localeCompare(b.fileName)
	)));

	const next = async (): Promise<void> => {
		const file = files.shift();
		if (!file) return;

		const { destPath, isDir, srcPath } = file;
		if (isDir) {
			await copyDirectory(srcPath, destPath, fileProcessor);
			return next();
		}

		let contents = await readFile(srcPath, 'utf8');
		if (fileProcessor) {
			contents = await fileProcessor(srcPath.replace(/_$/u, ''), contents);
		}

		await writeFile(destPath, contents, 'utf8');
		await next();
	};

	await next();
}
