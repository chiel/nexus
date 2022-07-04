import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import run from '../run';
import { getConfig } from '../utils';

jest.mock('yargs/helpers', () => ({ hideBin: jest.fn() }));
jest.mock('yargs/yargs', () => jest.fn());
jest.mock('../commands/lint', () => 'lint-command');
jest.mock('../commands/start', () => 'start-command');
jest.mock('../commands/test', () => 'test-command');
jest.mock('../utils', () => ({ getConfig: jest.fn() }));

describe('run', () => {
	let y: Record<string, jest.Mock>;

	beforeEach(() => {
		y = {};
		y.command = jest.fn(() => y);
		y.config = jest.fn(() => y);
		y.demandCommand = jest.fn(() => y);
		y.help = jest.fn(() => y);
		y.parserConfiguration = jest.fn(() => y);
		y.usage = jest.fn(() => y);

		(yargs as jest.Mock).mockReturnValue(y);
	});

	it('should set yargs up properly', () => {
		(getConfig as jest.Mock).mockReturnValue({ port: 1234 });
		(hideBin as jest.Mock).mockReturnValue(['--arg']);
		process.argv = ['test'];

		run();
		expect(hideBin).toHaveBeenCalledWith(['test']);
		expect(yargs).toHaveBeenCalledWith(['--arg']);
		expect(y.config).toHaveBeenCalledWith({ port: 1234 });
		expect(y.parserConfiguration).toHaveBeenCalledWith({ 'unknown-options-as-args': true });
		expect(y.usage).toHaveBeenCalledWith('Usage: $0 <command> [options]');
		expect(y.command).toHaveBeenCalledWith('lint-command');
		expect(y.command).toHaveBeenCalledWith('start-command');
		expect(y.command).toHaveBeenCalledWith('test-command');
		expect(y.demandCommand).toHaveBeenCalledWith();
		expect(y.help).toHaveBeenCalledWith();
	});
});
