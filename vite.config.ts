import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		polyfillModulePreload: false,
		sourcemap: true,
	},
	assetsInclude: [
		'**/*.xml',
	],
});
