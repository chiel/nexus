import chalk from 'chalk';
import { access } from 'fs/promises';
import path from 'path';

import applyTemplate from '../applyTemplate';
import copyDirectory from '../copyDirectory';

jest.mock('fs/promises');
jest.mock('../copyDirectory');

describe('applyTemplate', () => {
	const src = path.resolve(__dirname, '..', 'templates/base');

	beforeEach(() => {
		jest.spyOn(console, 'info').mockImplementation();
		(access as jest.Mock).mockRejectedValue(new Error('Boop'));
		(copyDirectory as jest.Mock).mockImplementation();
	});

	it('should log a message for the template being applied', async () => {
		await applyTemplate('base', '/dest');

		expect(console.info).toHaveBeenCalledWith('Applying template', chalk.green('base'));
	});

	it('should copy the template files directory if it exists', async () => {
		(access as jest.Mock).mockResolvedValue(undefined);
		await applyTemplate('base', '/dest');

		expect(copyDirectory).toHaveBeenCalledWith(`${src}/files`, '/dest', expect.any(Function));
	});

	it('should log a message for each file being processed and return the contents unaltered', async () => {
		(access as jest.Mock).mockResolvedValue(undefined);
		await applyTemplate('base', '/dest');

		const [[,, fp]] = (copyDirectory as jest.Mock).mock.calls;
		fp(`${src}/files/.npmrc`, 'beepboop');
		expect(console.info).toHaveBeenCalledWith('    ...copying', chalk.green('.npmrc'));
	});
});
