import fileExists from '../fileExists';
import getClientEntry from '../getClientEntry';
import logger from '../logger';
import * as index from '..';

describe('index', () => {
	it('should export all utils', () => {
		expect(index.fileExists).toBe(fileExists);
		expect(index.getClientEntry).toBe(getClientEntry);
		expect(index.logger).toBe(logger);
	});
});
