import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { logger } from './utils';

process.on('uncaughtException', function(err) {
	logger.error(err.message);
	process.exit(1);
});

yargs(hideBin(process.argv))
	.usage('$0 <command> [options]')
	.demandCommand()
	.strict()
	.help()
	.argv
