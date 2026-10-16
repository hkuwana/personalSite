import { env } from '$env/dynamic/private';
import { encodedContact } from '$lib/server/contact';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({
	contact: encodedContact(),
	// Read at build time and passed down, so no env file is shipped to the browser.
	posthog: { key: env.POSTHOG_KEY ?? '', host: env.POSTHOG_HOST || 'https://us.i.posthog.com' }
});
