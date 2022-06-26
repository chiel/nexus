import chalk from 'chalk';

import logger from '../logger';

describe('logger', () => {
	it('should style error messages', () => {
		jest.spyOn(console, 'error').mockImplementation();
		logger.error('boop');
		expect(console.error).toHaveBeenCalledWith(
			chalk.black.bgRed(' ERROR '),
			chalk.red('boop'),
		);
	});

	it('should style info messages', () => {
		jest.spyOn(console, 'info').mockImplementation();
		logger.info('boop');
		expect(console.info).toHaveBeenCalledWith(
			chalk.black.bgBlue(' INFO '),
			chalk.blue('boop'),
		);
	});
});
