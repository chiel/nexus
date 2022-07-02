import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { Env } from '../../types';
import { getClientEntry, logger } from '../../utils';
import { getClientConfig } from '../../webpack';
import command from '../start';

jest.mock('webpack');
jest.mock('webpack-dev-server');
jest.mock('../../utils', () => ({
	getClientEntry: jest.fn(),
	logger: {
		error: jest.fn(),
		info: jest.fn(),
	},
}));
jest.mock('../../webpack', () => ({
	getClientConfig: jest.fn(),
}));

describe('command', () => {
	it('should properly configure the command', () => {
		expect(command).toEqual({
			command: 'start',
			describe: 'Start a development server',
			builder: {
				port: { default: 3000, type: 'number' },
			},
			handler: expect.any(Function),
		});
	});
});

describe('handler', () => {
	const { handler } = command;
	const defaultArgs = { _: [], $0: '', port: 3000 };

	let start: jest.Mock;

	beforeEach(() => {
		jest.spyOn(process, 'exit').mockImplementation();

		start = jest.fn().mockImplementation(() => Promise.resolve());
		(webpack as unknown as jest.Mock).mockReturnValue('compiler');
		(WebpackDevServer as unknown as jest.Mock).mockReturnValue({ start });
	});

	it('should start a development server with default args', async () => {
		(getClientEntry as jest.Mock).mockReturnValue('entry');
		(getClientConfig as jest.Mock).mockReturnValue('client-config');

		await handler(defaultArgs);

		expect(getClientConfig).toHaveBeenCalledWith({ entry: 'entry', env: Env.Development });
		expect(webpack).toHaveBeenCalledWith(['client-config']);
		expect(WebpackDevServer).toHaveBeenCalledWith(
			{ compress: true, historyApiFallback: true, port: 3000 },
			'compiler',
		);
		expect(logger.info).toHaveBeenCalledWith('Starting development server...');
		expect(start).toHaveBeenCalledWith();
		expect(logger.info).toHaveBeenCalledWith('Development server listening on http://localhost:3000');
	});

	it('should log an error if a proper error happens', async () => {
		(getClientEntry as jest.Mock).mockImplementation(() => {
			throw new Error('Uh-oh!');
		});

		await handler(defaultArgs);
		expect(logger.error).toHaveBeenCalledWith('Uh-oh!');
	});

	it('should log an error if an unknown error happens', async () => {
		(getClientEntry as jest.Mock).mockImplementation(() => {
			throw 'Unknown';
		});

		await handler(defaultArgs);
		expect(logger.error).toHaveBeenCalledWith('Unknown');
	});
});
