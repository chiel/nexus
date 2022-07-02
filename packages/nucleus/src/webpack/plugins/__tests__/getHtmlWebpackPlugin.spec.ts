import HtmlWebpackPlugin from 'html-webpack-plugin';

import getHtmlWebpackPlugin from '../getHtmlWebpackPlugin';

jest.mock('html-webpack-plugin');

describe('getHtmlWebpackPlugin', () => {
	it('should return a HtmlWebpackPlugin', () => {
		const result = getHtmlWebpackPlugin();
		expect(result).toBeInstanceOf(HtmlWebpackPlugin);
	});
});
