import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import testCommand from './commands/test';

export default function run() {
	yargs(hideBin(process.argv))
		.usage('Usage: $0 <command> [options]')
		.command(testCommand)
		.demandCommand()
		.strict()
		.help()
		.argv;
}
