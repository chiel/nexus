import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import lintCommand from './commands/lint';
import startCommand from './commands/start';
import testCommand from './commands/test';
import { getConfig } from './utils';

export default function run() {
	yargs(hideBin(process.argv))
		.config(getConfig())
		.parserConfiguration({ 'unknown-options-as-args': true })
		.usage('Usage: $0 <command> [options]')
		.command(lintCommand)
		.command(startCommand)
		.command(testCommand)
		.demandCommand()
		.help()
		.argv;
}
