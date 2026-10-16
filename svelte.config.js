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
			// Detail routes (/diagnostics/[slug], /skills/[slug]) have no entries until the first real
			// one is published; drafts and fixtures are left out of production builds.
			handleUnseenRoutes: 'warn'
		}
	}
};

export default config;
