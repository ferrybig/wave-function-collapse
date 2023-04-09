#!/usr/bin/env node
for (let i = 2; i < process.argv.length; i++) {
	const arg = process.argv[i];
	// eslint-disable-next-line no-console
	console.log(`import ${arg.replace(/\.[^.]+$/, '').replace(/([-_][a-z])/ig, ($1) => {
		return $1.toUpperCase()
			.replace('-', '')
			.replace('_', '');
	})} from './${arg}'`);
}
export {};
