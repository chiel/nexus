import { access } from 'fs/promises';

import fileExists from '../fileExists';

jest.mock('fs/promises', () => ({
	access: jest.fn(),
}));

describe('fileExists', () => {
	it('should return true if the file exists', async () => {
		const exists = await fileExists('/path/to/file');
		expect(access).toHaveBeenCalledWith('/path/to/file');
		expect(exists).toBeTruthy();
	});

	it('should return false if the file does not exist', async () => {
		(access as jest.Mock).mockImplementation(() => {
			throw new Error('File does not exist.');
		});
		const exists = await fileExists('/path/to/file');
		expect(exists).toBeFalsy();
	});
});
