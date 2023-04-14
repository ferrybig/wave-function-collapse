import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		sourcemap: true,
		modulePreload: {
			polyfill: false,
		},
		target: ['chrome111', 'firefox111'],
	},
});
