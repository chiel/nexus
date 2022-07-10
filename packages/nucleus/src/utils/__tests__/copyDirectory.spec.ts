import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';

import copyDirectory from '../copyDirectory';

jest.mock('fs/promises');

describe('copyDirectory', () => {
	let isDirectory: jest.Mock;

	beforeEach(() => {
		isDirectory = jest.fn(() => false);

		(mkdir as jest.Mock).mockImplementation();
		(readdir as jest.Mock).mockReturnValue([]);
		(readFile as jest.Mock).mockReturnValue('');
		(stat as jest.Mock).mockReturnValue({ isDirectory });
		(writeFile as jest.Mock).mockImplementation();
	});

	it('should create the destination directory', async () => {
		await copyDirectory('/src', '/dest');
		expect(mkdir).toHaveBeenCalledWith('/dest', { recursive: true });
	});

	it('should get all files in the source directory', async () => {
		await copyDirectory('/src', '/dest');
		expect(readdir).toHaveBeenCalledWith('/src');
	});

	it('should read and write each file', async () => {
		(readdir as jest.Mock).mockReturnValue(['.npmrc']);
		(readFile as jest.Mock).mockReturnValue('beepboop');

		await copyDirectory('/src', '/dest');
		expect(readFile).toHaveBeenCalledWith('/src/.npmrc', 'utf8');
		expect(writeFile).toHaveBeenCalledWith('/dest/.npmrc', 'beepboop', 'utf8');
	});

	it('should call the file processor, if provided, for each file being copied', async () => {
		(readdir as jest.Mock).mockReturnValue(['.npmrc', '.eslintrc.js_']);
		(readFile as jest.Mock).mockReturnValue('beepboop');

		const processor = jest.fn(() => 'boopbeep');

		await copyDirectory('/src', '/dest', processor);
		expect(readFile).toHaveBeenCalledWith('/src/.npmrc', 'utf8');
		expect(processor).toHaveBeenCalledWith('/src/.eslintrc.js', 'beepboop');
		expect(processor).toHaveBeenCalledWith('/src/.npmrc', 'beepboop');
		expect(writeFile).toHaveBeenCalledWith('/dest/.eslintrc.js', 'boopbeep', 'utf8');
		expect(writeFile).toHaveBeenCalledWith('/dest/.npmrc', 'boopbeep', 'utf8');
	});

	it('should copy directories recursively', async () => {
		(readFile as jest.Mock).mockReturnValue('beepboop');

		(readdir as jest.Mock)
			.mockReturnValueOnce(['dir2', 'file1', 'dir1', 'file2'])
			.mockReturnValueOnce(['dir1file1'])
			.mockReturnValueOnce(['dir2file1']);

		isDirectory
			.mockReturnValueOnce(true)
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(true)
			.mockReturnValueOnce(false);

		await copyDirectory('/src', '/dest');

		expect(mkdir).toHaveBeenCalledWith('/dest', { recursive: true });
		expect(mkdir).toHaveBeenCalledWith('/dest/dir1', { recursive: true });
		expect(mkdir).toHaveBeenCalledWith('/dest/dir2', { recursive: true });
		expect(readFile).toHaveBeenCalledWith('/src/file1', 'utf8');
		expect(readFile).toHaveBeenCalledWith('/src/file2', 'utf8');
		expect(readFile).toHaveBeenCalledWith('/src/dir1/dir1file1', 'utf8');
		expect(readFile).toHaveBeenCalledWith('/src/dir2/dir2file1', 'utf8');
		expect(writeFile).toHaveBeenCalledWith('/dest/file1', 'beepboop', 'utf8');
		expect(writeFile).toHaveBeenCalledWith('/dest/file2', 'beepboop', 'utf8');
		expect(writeFile).toHaveBeenCalledWith('/dest/dir1/dir1file1', 'beepboop', 'utf8');
		expect(writeFile).toHaveBeenCalledWith('/dest/dir2/dir2file1', 'beepboop', 'utf8');
	});
});
