import { Env } from '../../types';
import getClientConfig from '../getClientConfig';

jest.mock('../plugins', () => ({
	getHtmlWebpackPlugin: () => 'html-webpack-plugin',
}));

describe('getClientConfig', () => {
	it('should create a development config', () => {
		const config = getClientConfig({ entry: 'entry', env: Env.Development });
		expect(config).toEqual({
			mode: 'development',
			devtool: 'cheap-module-source-map',
			entry: { app: 'entry' },
			resolve: { extensions: ['.tsx', '.ts', '.js', '.json'] },
			module: {
				rules: [
					{
						test: /\.tsx?$/u,
						exclude: /node_modules/u,
						loader: 'ts-loader',
					},
				],
			},
			plugins: ['html-webpack-plugin'],
			stats: 'errors-warnings',
			infrastructureLogging: { level: 'none' },
		});
	});

	it('should create a production config', () => {
		const config = getClientConfig({ entry: 'entry', env: Env.Production });
		expect(config).toEqual({
			mode: 'production',
			devtool: 'source-map',
			entry: { app: 'entry' },
			resolve: { extensions: ['.tsx', '.ts', '.js', '.json'] },
			module: {
				rules: [
					{
						test: /\.tsx?$/u,
						exclude: /node_modules/u,
						loader: 'ts-loader',
					},
				],
			},
			plugins: ['html-webpack-plugin'],
			stats: 'errors-warnings',
			infrastructureLogging: { level: 'none' },
		});
	});
});
