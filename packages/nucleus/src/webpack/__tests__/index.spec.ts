import getClientConfig from '../getClientConfig';
import * as index from '..';

describe('index', () => {
	it('should export all webpack utils', () => {
		expect(index.getClientConfig).toBe(getClientConfig);
	});
});
