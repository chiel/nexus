import { Configuration } from 'webpack';

import { Env } from '../types';
import { getHtmlWebpackPlugin } from './plugins';

interface Options {
	entry: string;
	env: Env;
}

export default function getClientConfig({ entry, env }: Options): Configuration {
	const isDev = env === Env.Development;

	return {
		mode: isDev ? 'development' : 'production',
		devtool: isDev ? 'cheap-module-source-map' : 'source-map',
		entry: {
			app: entry,
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.json'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/u,
					exclude: /node_modules/u,
					loader: require.resolve('ts-loader'),
				},
			],
		},
		plugins: [
			getHtmlWebpackPlugin(),
		],
		stats: 'errors-warnings',
		infrastructureLogging: {
			level: 'none',
		},
	};
}
