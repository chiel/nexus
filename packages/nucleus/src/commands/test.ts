import { run } from 'jest';
import { CommandModule } from 'yargs';

import { fileExists } from '../utils';

interface CommandOptions {
	coverage: boolean;
	watch: boolean;
}

const command: CommandModule<{}, CommandOptions> = {
	command: 'test',
	describe: 'Run tests',
	builder: {
		coverage: {
			boolean: true,
			default: false,
			description: 'Collect coverage',
		},
		watch: {
			alias: 'w',
			boolean: true,
			default: false,
			description: 'Run tests in watch mode',
		},
	},
	async handler(args) {
		let jestConfigPath = `${process.cwd()}/jest.config.js`;
		const hasJestConfig = await fileExists(jestConfigPath);
		if (!hasJestConfig) jestConfigPath = `${__dirname}/configs/jest.js`

		const runArgs: string[] = ['-c', jestConfigPath];
		if (args.coverage) runArgs.push('--coverage');
		if (args.watch) runArgs.push('--watch');

		run(runArgs);
	},
};

export default command;
