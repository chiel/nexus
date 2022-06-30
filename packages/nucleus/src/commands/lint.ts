import { ESLint } from 'eslint';
import { CommandModule } from 'yargs';

import { fileExists } from '../utils';

interface CommandOptions {
	fix: boolean;
}

const command: CommandModule<unknown, CommandOptions> = {
	command: 'lint',
	describe: 'Lint code',
	builder: {
		fix: {
			boolean: true,
			default: false,
		},
	},
	async handler({ fix }) {
		try {
			const useEslintrc = await fileExists(`${process.cwd()}/.eslintrc.js`);
			const overrideConfigFile = useEslintrc ? undefined : `${__dirname}/configs/eslint.js`;

			const eslint = new ESLint({ fix, overrideConfigFile, useEslintrc });
			const results = await eslint.lintFiles('.');

			if (fix) await ESLint.outputFixes(results);

			const formatter = await eslint.loadFormatter('stylish');
			const resultText = formatter.format(results);
			console.info(resultText);
		} catch (err: unknown) {
			console.error(err);
		}
	},
};

export default command;
