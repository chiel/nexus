import chalk from 'chalk';

export default {
	error: (msg: string) => {
		console.error(chalk.black.bgRed(' ERROR '), chalk.red(msg));
	},
	info: (msg: string) => {
		console.info(chalk.black.bgBlue(' INFO '), chalk.blue(msg));
	},
}
