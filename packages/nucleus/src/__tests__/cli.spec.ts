import run from '../run';
import { logger } from '../utils';

jest.mock('../run', () => jest.fn());
jest.mock('../utils', () => ({
	logger: { error: jest.fn() },
}));

describe('cli', () => {
	it('should add an event handler which logs and exits for uncaught exceptions', () => {
		jest.spyOn(process, 'exit').mockImplementation();
		jest.spyOn(process, 'on').mockImplementation();

		require('../cli');

		expect(process.on).toHaveBeenCalledWith('uncaughtException', expect.any(Function));
		expect(run).toHaveBeenCalledWith();

		const [[, callback]] = (process.on as jest.Mock).mock.calls;
		callback(new Error('Oh no!'));

		expect(logger.error).toHaveBeenCalledWith('Oh no!');
		expect(process.exit).toHaveBeenCalledWith(1);
	});
});
