import fileExists from '../fileExists';
import getClientEntry from '../getClientEntry';
import getConfig from '../getConfig';
import getPackageJson from '../getPackageJson';
import logger from '../logger';
import * as index from '..';

describe('index', () => {
	it('should export all utils', () => {
		expect(index.fileExists).toBe(fileExists);
		expect(index.getClientEntry).toBe(getClientEntry);
		expect(index.getConfig).toBe(getConfig);
		expect(index.getPackageJson).toBe(getPackageJson);
		expect(index.logger).toBe(logger);
	});
});
