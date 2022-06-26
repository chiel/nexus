import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import run from '../run';

jest.mock('yargs/helpers', () => ({ hideBin: jest.fn() }));
jest.mock('yargs/yargs', () => jest.fn());
jest.mock('../commands/test', () => 'test-command');

describe('run', () => {
	let y: Record<string, jest.Mock>;

	beforeEach(() => {
		y = {};
		y.command = jest.fn(() => y);
		y.demandCommand = jest.fn(() => y);
		y.help = jest.fn(() => y);
		y.strict = jest.fn(() => y);
		y.usage = jest.fn(() => y);

		(yargs as jest.Mock).mockReturnValue(y);
	});

	it('should set yargs up properly', () => {
		(hideBin as jest.Mock).mockReturnValue(['--arg']);
		process.argv = ['test'];

		run();
		expect(hideBin).toHaveBeenCalledWith(['test']);
		expect(yargs).toHaveBeenCalledWith(['--arg']);
		expect(y.command).toHaveBeenCalledWith('test-command');
		expect(y.usage).toHaveBeenCalledWith('Usage: $0 <command> [options]');
		expect(y.demandCommand).toHaveBeenCalledWith();
		expect(y.strict).toHaveBeenCalledWith();
		expect(y.help).toHaveBeenCalledWith();
	});
});
