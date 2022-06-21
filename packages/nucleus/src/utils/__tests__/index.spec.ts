import logger from '../logger';
import * as index from '..';

describe('index', () => {
	it('should export all utils', () => {
		expect(index.logger).toBe(logger);
	});
});
