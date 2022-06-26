import fileExists from '../fileExists';
import logger from '../logger';
import * as index from '..';

describe('index', () => {
	it('should export all utils', () => {
		expect(index.fileExists).toBe(fileExists);
		expect(index.logger).toBe(logger);
	});
});
