import HtmlWebpackPlugin from 'html-webpack-plugin';

import getHtmlWebpackPlugin, { DEFAULT_TEMPLATE } from '../getHtmlWebpackPlugin';

jest.mock('html-webpack-plugin');

describe('getHtmlWebpackPlugin', () => {
	it('should return a HtmlWebpackPlugin', () => {
		const result = getHtmlWebpackPlugin();
		expect(HtmlWebpackPlugin).toHaveBeenCalledWith({
			publicPath: '/',
			templateContent: DEFAULT_TEMPLATE,
		});
		expect(result).toBeInstanceOf(HtmlWebpackPlugin);
	});
});
