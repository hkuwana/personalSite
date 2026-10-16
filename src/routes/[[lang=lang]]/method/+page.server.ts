import { content } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({
	posts: content.method.map(({ html: _html, ...post }) => post)
});
