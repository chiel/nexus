// eslint-disable-next-line jest/no-jest-import
import { run } from 'jest';
import { CommandModule } from 'yargs';

import { fileExists } from '../utils';

const command: CommandModule = {
	command: 'test',
	describe: 'Run tests',
	async handler({ _: [, ...args] }) {
		let jestConfigPath = `${process.cwd()}/jest.config.js`;
		const hasJestConfig = await fileExists(jestConfigPath);
		if (!hasJestConfig) jestConfigPath = `${__dirname}/configs/jest.js`;

		run(['-c', jestConfigPath, ...(args as string[])]);
	},
};

export default command;
