import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Cloudflare Workers with static assets, the same platform otterd.co deploys to.
		// Config lives in wrangler.jsonc.
		adapter: adapter(),
		prerender: {
			entries: ['*', '/ja'],
			// Until every section in the navigation has a route, a missing page is a warning.
			handleHttpError: 'warn'
		}
	}
};

export default config;
