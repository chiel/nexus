import getHtmlWebpackPlugin from '../getHtmlWebpackPlugin';
import * as index from '..';

describe('index', () => {
	it('should export all webpack plugin functions', () => {
		expect(index.getHtmlWebpackPlugin).toBe(getHtmlWebpackPlugin);
	});
});
