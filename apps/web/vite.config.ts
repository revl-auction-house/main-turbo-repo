import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer, type PreviewServerForHook } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import houdini from 'houdini/vite';

/** @type {import('vite').Plugin} */
const crossOriginIsolationPlugin = () => ({
	name: 'cross-origin-isolation',
	configureServer: (server: ViteDevServer) => {
		server.middlewares.use((_, response, next) => {
			response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			next();
		});
	},
	configurePreviewServer: (server: PreviewServerForHook) => {
		server.middlewares.use((_, response, next) => {
			response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			next();
		});
	}
});

export default defineConfig({
	plugins: [
		houdini(),
		sveltekit(),
		crossOriginIsolationPlugin(),
		topLevelAwait({
			// The export name of top-level await promise for each chunk module
			promiseExportName: '__tla',
			// The function to generate import names of top-level await promise in each chunk module
			promiseImportName: (i) => `__tla_${i}`
		})
	],
	build: {
		target: 'esnext'
	},
	worker: {
		format: 'es',
		plugins: [sveltekit(), crossOriginIsolationPlugin()]
	}
});
