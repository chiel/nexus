import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/cli.ts',
	output: {
		file: 'dist/nucleus',
		format: 'cjs',
		banner: '#!/usr/bin/env node',
	},
	plugins: [
		commonjs(),
		json(),
		typescript(),
	],
	external: [
		'chalk',
		'yargs',
		'yargs/helpers',
	],
};
