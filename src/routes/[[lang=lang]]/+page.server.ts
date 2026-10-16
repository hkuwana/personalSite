import { content } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({
	featured: content.method
		.filter((p) => p.featured)
		.slice(0, 3)
		.map(({ html: _html, ...post }) => post)
});
