import run from './run';
import { logger } from './utils';

process.on('uncaughtException', function(err) {
	logger.error(err.message);
	process.exit(1);
});

run();
