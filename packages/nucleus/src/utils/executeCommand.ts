import { spawn } from 'child_process';

export default function executeCommand(
	cmd: string,
	args: string[],
	cwd: string,
): Promise<void> {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, { cwd, stdio: 'inherit' });
		child.on('close', code => {
			if (code !== 0) {
				reject(new Error(`Failed to execute child command: ${cmd} ${args.join(' ')}`));
				return;
			}

			resolve();
		});
	});
}
