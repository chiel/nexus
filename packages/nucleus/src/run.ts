import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import lintCommand from './commands/lint';
import testCommand from './commands/test';

export default function run() {
	yargs(hideBin(process.argv))
		.parserConfiguration({ 'unknown-options-as-args': true })
		.usage('Usage: $0 <command> [options]')
		.command(lintCommand)
		.command(testCommand)
		.demandCommand()
		.help()
		.argv;
}
