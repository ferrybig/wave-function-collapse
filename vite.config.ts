import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		sourcemap: true,
		assetsInlineLimit: 1024*32,
		modulePreload: {
			polyfill: false,
		},
	},
	assetsInclude: [
		'**/*.xml',
	],
});
