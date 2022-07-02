import { readdir } from 'fs/promises';

import getClientEntry from '../getClientEntry';

jest.mock('fs/promises', () => ({
	readdir: jest.fn(),
}));

describe('getClientEntry', () => {
	beforeEach(() => {
		jest.spyOn(process, 'cwd').mockReturnValue('/path/to');
	});

	it('should throw an error if a client entry is not found', async () => {
		(readdir as jest.Mock).mockResolvedValue([]);

		const shouldThrow = async () => {
			await getClientEntry();
		};
		await expect(shouldThrow).rejects.toThrow('Could not find client index file.');
		expect(readdir).toHaveBeenCalledWith('/path/to/src/client');
		expect(readdir).toHaveBeenCalledWith('/path/to/src');
	});

	it.each([
		['index.js'],
		['index.ts'],
		['index.tsx'],
	])('should return the correct path if a %s file is in the client directory', async file => {
		(readdir as jest.Mock).mockResolvedValue([file]);

		const entry = await getClientEntry();
		expect(entry).toBe('/path/to/src/client/index');
	});

	it.each([
		['index.js'],
		['index.ts'],
		['index.tsx'],
	])('should return the correct path if a %s file is in the src directory', async file => {
		(readdir as jest.Mock)
			.mockResolvedValueOnce([file])
			.mockResolvedValueOnce([file]);

		const entry = await getClientEntry();
		expect(entry).toBe('/path/to/src/client/index');
	});
});
