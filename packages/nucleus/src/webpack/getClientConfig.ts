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
		plugins: [
			getHtmlWebpackPlugin(),
		],
		stats: 'errors-warnings',
		infrastructureLogging: {
			level: 'none',
		},
	};
}
