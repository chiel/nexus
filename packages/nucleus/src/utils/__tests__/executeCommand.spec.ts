import { spawn } from 'child_process';

import executeCommand from '../executeCommand';

jest.mock('child_process');

describe('executeCommand', () => {
	let on: jest.Mock;

	beforeEach(() => {
		on = jest.fn();
		(spawn as jest.Mock).mockImplementation(() => ({ on }));
	});

	it('should throw an error if the command fails to execute', async () => {
		const promise = executeCommand('pnpm', ['i', '@chiel/nucleus@latest'], '/path/to');
		expect(spawn).toHaveBeenCalledWith(
			'pnpm',
			['i', '@chiel/nucleus@latest'],
			{ cwd: '/path/to', stdio: 'inherit' },
		);
		expect(on).toHaveBeenCalledWith('close', expect.any(Function));
		const [[, callback]] = (on as jest.Mock).mock.calls;
		callback(1);

		const shouldThrow = async () => {
			await promise;
		};
		const err = 'Failed to execute child command: pnpm i @chiel/nucleus@latest';
		await expect(shouldThrow).rejects.toThrow(err);
	});

	it('should resolve without a value if the command successfully executes', async () => {
		const promise = executeCommand('pnpm', ['i', '@chiel/nucleus@latest'], '/path/to');
		const [[, callback]] = (on as jest.Mock).mock.calls;
		callback(0);

		const value = await promise;
		expect(value).toBe(undefined);
	});
});
