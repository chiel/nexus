import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
	.usage('$0 <command> [options]')
	.demandCommand()
	.strict()
	.help()
	.argv
