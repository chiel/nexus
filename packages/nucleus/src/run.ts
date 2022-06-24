import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

export default function run() {
	yargs(hideBin(process.argv))
		.usage('Usage: $0 <command> [options]')
		.demandCommand()
		.strict()
		.help()
		.argv
}
