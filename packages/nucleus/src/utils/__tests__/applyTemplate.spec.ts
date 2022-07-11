import chalk from 'chalk';
import path from 'path';

import applyTemplate from '../applyTemplate';
import copyDirectory from '../copyDirectory';

jest.mock('../copyDirectory');

describe('applyTemplate', () => {
	const src = path.resolve(__dirname, '..', 'templates/base');

	beforeEach(() => {
		jest.spyOn(console, 'info').mockImplementation();
		(copyDirectory as jest.Mock).mockImplementation();
	});

	it('should call copy directory for the template files directory', async () => {
		await applyTemplate('base', '/dest');

		expect(console.info).toHaveBeenCalledWith('Apply template', chalk.green('base'));
		expect(copyDirectory).toHaveBeenCalledWith(`${src}/files`, '/dest', expect.any(Function));
	});

	it('should log a message for each file being processed and return the contents unaltered', async () => {
		await applyTemplate('base', '/dest');

		const [[,, fp]] = (copyDirectory as jest.Mock).mock.calls;

		fp(`${src}/files/.npmrc`, 'beepboop');
		expect(console.info).toHaveBeenCalledWith('    ...copying', chalk.green('.npmrc'));
	});
});
