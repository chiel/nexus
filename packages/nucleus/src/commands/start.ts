import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { CommandModule } from 'yargs';

import { Env } from '../types';
import { getClientEntry, logger } from '../utils';
import { getClientConfig } from '../webpack';

interface CommandOptions {
	port: number;
}

const command: CommandModule<unknown, CommandOptions> = {
	command: 'start',
	describe: 'Start a development server',
	builder: {
		port: {
			default: 3000,
			type: 'number',
		},
	},
	async handler(args) {
		try {
			const clientEntry = await getClientEntry();

			const config: Configuration[] = [
				getClientConfig({
					entry: clientEntry,
					env: Env.Development,
				}),
			];

			const devServerConfig = {
				compress: true,
				historyApiFallback: true,
				port: args.port,
			};

			const compiler = webpack(config);
			const server = new WebpackDevServer(devServerConfig, compiler);
			logger.info('Starting development server...');
			await server.start();
			logger.info(`Development server listening on http://localhost:${args.port}`);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : err as string;
			logger.error(msg);
			process.exit(1);
		}
	},
};

export default command;
